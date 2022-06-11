import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import { createClient } from "next-sanity";
import PortableText from "react-portable-text"


export default function Home({blogs}) {
  console.log(blogs);
  return (
    <div className="home">
    <div className="nav bg-gray-400 ">
      {blogs[0].title}
    </div>
    <PortableText
      // Pass in block content straight from Sanity.io
      content={blogs[0].content}
      projectId= "hdh1hh3k"
      dataset= "production"
      serializers={{
        h1: (props) => <h1 style={{ color: "red" }} {...props} />,
        li: ({ children }) => <li className="special-list-item">{children}</li>,
      }}
    />
      <span>I am Home Page</span>
    </div>
  )
}

export async function getServerSideProps(context) {
  const client = createClient({
    projectId: "hdh1hh3k",
    dataset: "production",
    // apiVersion: "2022-03-25",
    useCdn: false
  });
  const query = `*[_type == "blog"]`;
  const blogs = await client .fetch(query)
  return {
    props: {
      blogs
    }, // will be passed to the page component as props
  }
}