import { useState, useEffect, useCallback } from "react";
import { ActivityIndicator } from "react-native";

import {
  Container,
  CategoriesContainer,
  MenuContainer,
  CenteredContainer,
} from "./styles";

import { Header } from "../components/Header";
import { Categories } from "../components/Categories";
import { Menu } from "../components/Menu";
import { Button } from "../components/Button";
import { TableModal } from "../components/TableModal";
import { Footer } from "../components/Footer";
import { Cart } from "../components/Cart";
import { Text } from "../components/Text";
import { Empty } from "../components/Icons/Empty";

import { useTableOrder } from "../hooks/useTableOrder";
import { useCart } from "../hooks/useCart";

import { ProductData } from "../types/ProductData";
import { CategoryData } from "../types/CategoryData";

import { listCategories, productsByCategory } from "../services/category";
import { listProducts } from "../services/product";

export const Main = () => {
  const { handleResetOrder, handleSaveTable, selectTable } = useTableOrder();

  const {
    cartItems,
    handleAddToCart,
    handleDecrementCartItem,
    isTableModalVisible,
    setIsTableModalVisible,
    setCartItems,
  } = useCart(selectTable);

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  const handleSelectCategory = async (categoryId: string) => {
    setIsLoadingProducts(true);

    const request = !categoryId
      ? listProducts
      : () => productsByCategory(categoryId);

    const { data } = await request();
    setProducts(data);

    setIsLoadingProducts(false);
  };

  useEffect(() => {
    Promise.all([listCategories(), listProducts()]).then(
      ([categoriesList, productsList]) => {
        setCategories(categoriesList.data);
        setProducts(productsList.data);
        setIsLoading(false);
      }
    );
  }, []);

  return (
    <>
      <Container>
        <Header
          selectTable={selectTable}
          onCancelOrder={() => {
            handleResetOrder();
            setCartItems([]);
          }}
        />

        {isLoading && (
          <CenteredContainer>
            <ActivityIndicator size="large" color="#d73035" />
          </CenteredContainer>
        )}

        {!isLoading && (
          <>
            <CategoriesContainer>
              <Categories
                categories={categories}
                onSelectCategory={handleSelectCategory}
              />
            </CategoriesContainer>

            {isLoadingProducts ? (
              <CenteredContainer>
                <ActivityIndicator size="large" color="#d73035" />
              </CenteredContainer>
            ) : (
              <>
                {products.length > 0 ? (
                  <MenuContainer>
                    <Menu products={products} onAddToCard={handleAddToCart} />
                  </MenuContainer>
                ) : (
                  <CenteredContainer>
                    <Empty />
                    <Text color="#6666" style={{ marginTop: 24 }}>
                      Nenhum produto foi encontrado
                    </Text>
                  </CenteredContainer>
                )}
              </>
            )}
          </>
        )}
      </Container>
      <Footer>
        {!selectTable && (
          <Button
            disabled={isLoading}
            onPress={() => setIsTableModalVisible(true)}
          >
            Novo Pedido
          </Button>
        )}

        {selectTable && (
          <Cart
            cartItems={cartItems}
            onAdd={handleAddToCart}
            onDecrement={handleDecrementCartItem}
            onConfirmOrder={() => {
              handleResetOrder();
              setCartItems([]);
            }}
            selectedTable={selectTable}
          />
        )}
      </Footer>
      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={(table) => handleSaveTable(table)}
      />
    </>
  );
};
