import { ReactNode, useState, FC } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Collapse,
  ButtonBase,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import sitemapEmp, { MenuItem, SubMenuItem } from "./routes/sitemapEmp";
import IconifyIcon from "components/base/IconifyIcon";
import Image from "components/base/Image";
import Logo from "assets/images/img.ico";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface EmployeeLayoutProps {
  children?: ReactNode; // ✅ children est maintenant optionnel
}

const EmployeeLayout: FC<EmployeeLayoutProps> = ({ children }) => {
  const drawerWidth = 240;
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (menuId: string) => {
    setOpenMenus((prev) => ({ ...prev, [menuId]: !prev[menuId] }));
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "center", py: 2 }}>
          <ButtonBase component={NavLink} to="/" disableRipple>
            <Image src={Logo} alt="logo" height={50} width={50} />
          </ButtonBase>
        </Toolbar>

        <List>
          {sitemapEmp.map((menu: MenuItem) => (
            <div key={menu.id}>
              <ListItem button onClick={() => menu.items && handleToggle(menu.id)}>
                {menu.icon && (
                  <ListItemIcon>
                    <IconifyIcon icon={menu.icon} />
                  </ListItemIcon>
                )}

                {menu.path ? (
                  <NavLink
                    to={menu.path}
                    style={{ textDecoration: "none", color: "inherit", width: "100%" }}
                  >
                    <ListItemText primary={menu.subheader} />
                  </NavLink>
                ) : (
                  <ListItemText primary={menu.subheader} />
                )}

                {menu.items && (openMenus[menu.id] ? <ExpandLess /> : <ExpandMore />)}
              </ListItem>

              {menu.items && (
                <Collapse in={openMenus[menu.id]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {menu.items.map((sub: SubMenuItem) => (
                      <ListItem key={sub.pathName} sx={{ pl: 4 }}>
                        <NavLink
                          to={sub.path}
                          style={{ textDecoration: "none", color: "inherit", width: "100%" }}
                        >
                          <ListItemText primary={sub.name} />
                        </NavLink>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </div>
          ))}
        </List>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default EmployeeLayout;
