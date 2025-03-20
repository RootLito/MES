import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import Splash from "./src/screens/Splash";
import NavBar from "./src/navigation/NavBar";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <StatusBar style="light" backgroundColor="#182553" />
      {showSplash ? <Splash /> : <NavBar />}
    </>
  );
}
