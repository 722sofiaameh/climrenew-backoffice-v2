"use client";
import {
  Box,
  Button,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// import close from "../../public/assets/chevron-left.png";
import Image from "next/image";
import SideBarLayout from "./SideBarLayout";
import { SideBarData } from "../../helpers/dashboardData";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface AdminDetailsProps {
  role: string;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminDetails");
    router.push("/");
  };

  const [adminDetails, setAdminDetails] = useState<AdminDetailsProps>();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("adminDetails") || "{}");
    if (items) {
      setAdminDetails(items);
    }
  }, []);

  const btnRef = React.useRef();

  const [isSettingsActive, setIsSettingsActive] = useState(false);

  // Use useEffect to set the active state based on window location
  useEffect(() => {
    // Ensure window is available before accessing its properties
    if (typeof window !== 'undefined') {
      setIsSettingsActive(window.location.pathname === '/settings');
    }
  }, []);

  return (
    <Box w="100%" minHeight={"100vh"} position={"relative"} bg="white">
      <Flex position={"relative"} mx="auto">
        {/* LEFT CONTAINER */}
        <Flex
          display={{ s: "none", lg: "flex" }}
          w={
            isCollapsed
              ? { lg: "120px", xlg: "150px", xxl: "250px" }
              : { lg: "280px", xl: "300px", xlg: "500px", xxl: "600px" }
          }
         
          bg="
          #22C55E"
          pt="30px"
          direction={"column"}
          height="100vh"
          position={"fixed"}
          boxShadow={"md"}
        >
          {/* TOP CONTAINER */}
        

          <Box
            sx={{
              ml: isCollapsed ? "10px" : "28px", // Adjust margin if necessary
              width: isCollapsed ? "30%" : "50%", // Control the width of the container
              height: 10, // Adjust size based on your preference
              mx: isCollapsed ? "auto" : "",
              position: "relative", // Required for Next.js Image component
            }}
          >
            <Image
              src={isCollapsed ? "/assets/climRenew-white.png" : "/assets/climRenew-white.png"}
              alt="trofira logo"
              layout="fill"
              quality={100}
              objectFit="contain"
            />
          </Box>

          {/* SIDE-MENU */}
          <Flex
            direction={"column"}
            gap="44px"
            pt={'12'}
           
      width={'full'}

            // overflowY={"scroll"}
            pb="150px"
       
          >
          
            {SideBarData?.map((item: any, index) => (
              <SideBarLayout
                key={index}
                route={item.route}
                label={item.title}
                isCollapsed={isCollapsed}
                activeImage={item.activeImage}
                inActiveImage={item.inActiveImage}
                // eslint-disable-next-line react/no-children-prop
                children={undefined}
              />
            ))}
           
           
           
          </Flex>

          {/* LOGOUT CONDITION */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader
                textAlign={"center"}
                pt={"14"}
                fontSize={"28px"}
                color={"#2D2D2D"}
                className="poppins"
                fontWeight={"600"}
              >
                Logout
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text
                  color={"#545454"}
                  fontSize={"16px"}
                  className="inter"
                  fontWeight={"600"}
                  lineHeight={"24px"}
            
                  textAlign={"center"}
                >
                  Are you sure you want to log out <br></br>of your account?
                </Text>
                <Flex
                  flexDirection={"column"}
                  alignItems={"center"}
                  gap={"4"}
                  py={"8"}
                >
                  <Button
                    w={"400px"}
                    p={"12px 24px 12px 24px"}
                    borderRadius={"30px"}
                    bg={"#DC143C"}
                    color={"white"}
                    fontWeight={"600"}
                    fontSize={"14px"}
                    className="inter"
                    as={"a"}
                    href="/"
                  >
                    Logout
                    <Image
                      src="/assets/ArrowRight-white.png"
                      alt="img"
                      width={20}
                      height={20}
                      quality={100}
                      style={{ marginLeft: "10px" }}
                    />
                  </Button>
                  <Button
                    w={"400px"}
                    p={"12px 24px 12px 24px"}
                    borderRadius={"30px"}
                    bg={"white"}
                    border={"1px solid #F9C2CD"}
                    color={"#DC143C"}
                    fontWeight={"600"}
                    fontSize={"14px"}
                    className="inter"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                </Flex>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Flex>

        {/* RIGHT CONTAINER */}
        <Flex
          w={{
            lg: "calc(100% - 110px)",
            xl: "calc(100% - 200px)",
            xxl: "calc(100% - 250px)",
          }}
          position="relative"
          minHeight="100vh"
          bg="#F8F8F8"
          ml={
            isCollapsed
              ? { base: "0", lg: "114px", xlg: "150px", xxl: "250px" }
              : { base: "0", lg: "280px", xlg: "310px", xxl: "400px" }
          }
          p={{ s: "0px 0px 45px", md: "0px 0px 45px", lg: "" }}
          direction="column"
        >
          {children}

          {/* this is the bottom bar for mobile screens */}
          
        </Flex>
      </Flex>
    </Box>
  );
};

export default DashboardLayout;