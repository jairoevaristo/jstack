import { useCallback, useState } from "react";
import * as S from "./styles";

import arrow from "../../assets/images/arrow.svg";
import category from "../../assets/images/category.svg";
import product from "../../assets/images/product.svg";
import user from "../../assets/images/user.svg";
import admin from "../../assets/images/admin.svg";

const sidebarItems = [
  {
    id: "7845hf7364gr9834y7trt7548",
    title: "Produtos",
    icon: product,
    href: "/",
  },
  {
    id: "8754yery34y458yytry4y4874",
    title: "Categorias",
    icon: category,
    href: "/",
  },
  {
    id: "9845yfhry34587trh94573yt54",
    title: "Administradores",
    icon: admin,
    href: "/",
  },
  {
    id: "8475h3848975yty45y896745698",
    title: "Usuários",
    icon: user,
    href: "/",
  },
];

export const Sidebar = () => {
  const [isFullSidebar, setisFullSidebar] = useState(false);

  const handleSidebar = useCallback(() => {
    setisFullSidebar((prevState) => !prevState);
  }, []);

  return (
    <S.Container isFull={isFullSidebar}>
      <S.WrapperButtonArrow>
        <S.ButtonArrow isFull={isFullSidebar}>
          <button onClick={handleSidebar}>
            <img src={arrow} alt="arrow" />
          </button>
        </S.ButtonArrow>
      </S.WrapperButtonArrow>

      <S.Divider />

      <S.WrapperButtonLink isFull={isFullSidebar}>
        {sidebarItems.map(({ href, icon, id, title }) => (
          <S.ButtonLink
            key={id}
            isFull={isFullSidebar}
            href={href}
            title={title}
          >
            <img src={icon} alt="product" />
            <span>{title}</span>
          </S.ButtonLink>
        ))}
      </S.WrapperButtonLink>
    </S.Container>
  );
};
