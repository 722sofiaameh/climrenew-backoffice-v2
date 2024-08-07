"use client";
import {
  Box,
  Text,
  Flex,
  useDisclosure,
  Grid,
  Link,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getBlogs } from "@/redux/features/allBlogs";
import Image from "next/image";
import PostCard from "../postCard";
import AddPostModal from "../addPostModal";

const PostContent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const { blogs, loading, error } = useAppSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  

  return (
    <>
      <Box pl="8" pt={"12"} pb={"12"}>
        <Box
          as="button"
          bg="#22C55E"
          color={"#FFFFFF"}
          borderRadius={"30px"}
          h={"48px"}
          w={"182px"}
          display={"flex"}
          justifyContent={"center"}
          gap={"3"}
          alignItems={"center"}
          onClick={onOpen}
        >
          <Image
            src="/assets/plusIconWhite.png"
            alt="search icon"
            width={20}
            height={20}
            quality={100}
          />
          <Text
            fontSize={"20px"}
            lineHeight={"24px"}
            fontWeight={"600"}
            className="urbanist"
            whiteSpace={"nowrap"}
          >
            Create Post
          </Text>
        </Box>
        {loading ? (
          <Flex justifyContent={"center"} alignItems={"center"} mt={"4%"}>
            {" "}
            <Spinner size="xl" color="#22C55E" thickness='4px'/>
          </Flex>
        ) : (
          <Flex
            // templateColumns={{
            //   base: "1fr",
            //   lg: "repeat(2, 1fr)",
            //   xlg: "repeat(3, 1fr)",
            // }}
            gap={{ lg: 10, xlg: 2 }}
            pt={"12"}
            // width={"511px"}
            flexWrap={'wrap'}
          >
            {Array.isArray(blogs) &&
              blogs.map((blog) => (
                <PostCard
                  key={blog.id}
                  name={blog.title}
                  content={blog.body}
                  img={blog.image} id={blog.id}                />
              ))}
          </Flex>
        )}
        <AddPostModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      </Box>
    </>
  );
};
export default PostContent;
