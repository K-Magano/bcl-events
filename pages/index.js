import EventList from "@/components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";
import { Fragment } from "react";
import Head from "next/head";
import NewsletterRegistration from "@/components/input/newsletter-registration";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>BCL Events</title>
        <meta
          name="description"
          content="Find awesome programming events to attend and network"
        />
      </Head>
      <p> In Pages/ index.js using getStaticProps to fetch data</p>
      <p>I am the "HomePage", 1st page crawlers will find</p>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    //one way of optimizing this page by regenerating the request every 30mns for incomming request.
    revalidate: 1800,
  };
}

export default HomePage;
