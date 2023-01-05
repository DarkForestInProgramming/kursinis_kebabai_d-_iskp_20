import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/cart/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { IKebab } from "../schemas/kebab.schema";
import { IOrder, Order } from "../schemas/order.schema";
import { ISauce, Sauce } from "../schemas/sauce.schema";
import { IUser, User } from "../schemas/user.schema";
import { useSession } from "next-auth/react";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  _id: string;
  quantity: number;
  sauce_id: string[];
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (_id: string) => number;
  increaseCartQuantity: (_id: string, sauceid?: string[]) => void;
  decreaseCartQuantity: (_id: string) => void;
  removeFromCart: (_id: string) => void;
  cartQuantity: number;
  cartItems: CartItem[];
  kebabs: IKebab[];
  sauces: ISauce[];
  users: IUser[];
  onSendCarts: (cs: string) => void;
  setKebabs: (k: IKebab[]) => void;
  setSauces: (s: ISauce[]) => void;
  slSauce: string[];
  setSlSauce: (ss: string[]) => void;
  clock: string;
  setClock: (sc: string) => void;
  changeDuration: (_id: string, duration: number) => void;
  slOrder: string;
  setSlOrder: (so: string) => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function UseShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [kebabs, setKebabs] = useState<IKebab[]>([]);
  const [clock, setClock] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [sauces, setSauces] = useState<ISauce[]>([]);
  const [slSauce, setSlSauce] = useState<string[]>([]);
  const [slOrder, setSlOrder] = useState<string>("");
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  const { data: session } = useSession();

  const changeDuration = async (_id: string, duration: number) => {
    const res = await fetch(`/api/order/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(duration),
    });
    console.log(res);
  };

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const onSendCarts = () => {
    const sCarts: Partial<IOrder>[] = cartItems.map((i) => ({
      pieces: i.quantity,
      title: kebabs.find((k) => k._id === i._id).title,
      status: "Užsakyta",
      sauces: i.sauce_id,
      user_id: session.user.email,
    }));
    fetch(`/api/order/[id]`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sCarts),
    });
  };

  function getItemQuantity(_id: string) {
    return cartItems.find((item) => item._id === _id)?.quantity || 0;
  }

  function increaseCartQuantity(_id: string, sauceid?: string[]) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item._id == _id) == null) {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "shopping-cart",
            JSON.stringify([
              ...currItems,
              { _id, quantity: 1, sauce_id: sauceid },
            ])
          );
        }
        return [...currItems, { _id, quantity: 1, sauce_id: sauceid }];
      }

      return currItems.map((item) => {
        if (item._id === _id) {
          return { ...item, quantity: item.quantity + 1, sauce_id: sauceid };
        } else {
          return item;
        }
      });
    });
  }

  function decreaseCartQuantity(_id: string) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item._id == _id)?.quantity === 1) {
        return currItems.filter((item) => item._id !== _id);
      } else {
        return currItems.map((item) => {
          if (item._id === _id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(_id: string) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item._id !== _id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
        kebabs,
        sauces,
        users,
        setSauces,
        slSauce,
        setSlSauce,
        setKebabs,
        onSendCarts,
        clock,
        setClock,
        changeDuration,
        slOrder,
        setSlOrder,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
