import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineThemes,
  ThemedLayoutV2,
  ThemedTitleV2,
} from "@refinedev/mantine";

import {
  ColorScheme,
  ColorSchemeProvider,
  Global,
  MantineProvider,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { AppIcon } from "./components/app-icon";
import { Header } from "./components/header";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { dataProvider } from "@tspvivek/refine-directus";
import { directusClient } from "./directusClient";
import { SaleOrderList, SaleOrderCreate } from "./pages/sale-orders";
import { PartnerList } from "./pages/partners";
import { ProductList } from "./pages/products";
import { SaleOrderItemList } from "./pages/sale-order-items";

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  const { t, i18n } = useTranslation();

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          {/* You can change the theme colors here. example: theme={{ ...RefineThemes.Magenta, colorScheme:colorScheme }} */}
          <MantineProvider
            theme={{
              ...RefineThemes.Blue,
              colorScheme: colorScheme,
              globalStyles: () => ({
                main: {
                  backgroundColor: "white",
                },
                // "main.Card": {
                //   padding: "0",
                // },
              }),
            }}
            withNormalizeCSS
            withGlobalStyles
          >
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <NotificationsProvider position="top-right">
              <Refine
                dataProvider={dataProvider(directusClient)}
                notificationProvider={notificationProvider}
                authProvider={authProvider}
                i18nProvider={i18nProvider}
                routerProvider={routerBindings}
                resources={[
                  {
                    name: "items",
                  },
                  {
                    name: "products",
                    list: "/products",
                    meta: {
                      parent: "Item",
                      canDelete: true,
                    },
                  },
                  {
                    name: "partners",
                    list: "/partners",
                  },
                  {
                    name: "sale_orders",
                    list: "/sale_orders",
                    create: "/sale_orders/create",
                  },
                  {
                    name: "sale_order_items",
                    list: "/sale_order_items",
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2
                          Header={() => <div></div>}
                          Title={({ collapsed }) => (
                            <ThemedTitleV2
                              collapsed={collapsed}
                              text="Vạn Phú Bình"
                              icon={<AppIcon />}
                            />
                          )}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="blog_posts" />}
                    />
                    <Route path="/products">
                      <Route index element={<ProductList />} />
                    </Route>
                    <Route path="/partners">
                      <Route index element={<PartnerList />} />
                    </Route>
                    <Route path="/sale_orders">
                      <Route index element={<SaleOrderList />} />
                      <Route path="create" element={<SaleOrderCreate />} />
                    </Route>
                    <Route path="/sale_order_items">
                      <Route index element={<SaleOrderItemList />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated fallback={<Outlet />}>
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
              </Refine>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
