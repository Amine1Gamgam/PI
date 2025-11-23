import { useState } from "react";
import { Layout, Menu, Dropdown, Space } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  ReadOutlined,
  CalendarOutlined,
  GlobalOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Sider } = Layout;
const SidebarComponent = ({ onSelectMenu }) => {
  const { t } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: t("Dashboard"),
    },
    {
      key: "candidates",
      icon: <UserOutlined />,
      label: t("Gestion Clients"),
    },
    {
      key: "trainers",
      icon: <TeamOutlined />,
      label: t("Gestion Freelancers"),
    },
    {
      key: "tags",
      icon: <CalendarOutlined />,
      label: t("Gestion Tags"),
    },
    {
      key: "categories",
      icon: <CalendarOutlined />,
      label: t("Gestion Catégories"),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: <span style={{ color: "red" }}>{t("Déconnexion")}</span>,
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={isCollapsed}
      onCollapse={() => setIsCollapsed(!isCollapsed)}
      style={{
        height: "100vh",
        backgroundColor: "#003a63",
        color: "white",
      }}
    >
      {/* Logo */}
      <div
        style={{
          color: "white",
          fontSize: "20px",
          fontWeight: "bold",
          textAlign: "center",
          padding: "20px 0",
        }}
      >
        {isCollapsed ? "ISET" : "Tunisians Freelancers"}
      </div>

      {/* Menu */}
      <Menu
        theme="dark"
        mode="inline"
        style={{
          backgroundColor: "#003a63",
          color: "white",
        }}
        items={menuItems.map((item) => ({
          ...item,
          onClick: () => onSelectMenu(item.key),
        }))}
      />
    </Sider>
  );
};

export default SidebarComponent;
