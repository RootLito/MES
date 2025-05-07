import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import Splash from "./src/screens/Splash";
import NavBar from "./src/navigation/NavBar";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <StatusBar style="light" backgroundColor="#182553" />
      {showSplash ? <Splash /> : <NavBar />}
    </ApplicationProvider>
  );
}
