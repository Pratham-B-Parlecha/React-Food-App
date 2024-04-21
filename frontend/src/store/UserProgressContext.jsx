import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress: '',
    showCart: () => {},
    closeCart: () => {},
    showCheckout: () => {},
    closeCheckout: () =>{}
})
export function UserProgressContextProvider({children}) {
    const [userProgress, setUserProgress] = useState('');
    function showCart(){
        setUserProgress('cart');
    }
    function showCheckout() {
        setUserProgress('checkout');
    }
    function closeCart() {
        setUserProgress('');
    }
    function closeCheckout() {
        setUserProgress('');
    }
    const userProgressCtx = {
        progress: userProgress,
        showCart,
        showCheckout,
        closeCart,
        closeCheckout
    }
    return <UserProgressContext.Provider value={userProgressCtx}>{children}</UserProgressContext.Provider>
}

export default UserProgressContext;