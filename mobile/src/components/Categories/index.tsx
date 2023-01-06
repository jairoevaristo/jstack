import { useState, useCallback } from "react";
import { FlatList } from "react-native";

import { Category, Icon } from "./styles";

import { Text } from "../Text";
import { CategoryData } from "../../types/CategoryData";

type CategoriesProps = {
  categories: CategoryData[];
  onSelectCategory: (categoryId: string) => Promise<void>;
};

export const Categories = ({
  categories,
  onSelectCategory,
}: CategoriesProps) => {
  const [selectCategory, setSelectCategory] = useState("");

  const handleSelectCategory = useCallback(
    (categoryId: string) => {
      const selectCategoryId = selectCategory === categoryId ? "" : categoryId;

      onSelectCategory(selectCategoryId);
      setSelectCategory(selectCategoryId);
    },
    [selectCategory]
  );

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => String(item._id)}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 24 }}
      renderItem={({ item: category }: { item: CategoryData }) => {
        const isSelected = category._id === selectCategory;

        return (
          <Category onPress={() => handleSelectCategory(category._id)}>
            <Icon>
              <Text opacity={isSelected ? 1 : 0.5}>{category.icon}</Text>
            </Icon>

            <Text size={14} weight="700" opacity={isSelected ? 1 : 0.5}>
              {category.name}
            </Text>
          </Category>
        );
      }}
    />
  );
};
