import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";
import { getAllEvents } from "../../helpers/api-util";
import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";

function AllEventsPage(props) {
  //Help function that is declared in the Dummy data file.

  const router = useRouter(); //router used for navagation
  const { events } = props;

  //two or more slashes it uses ... slug file redirection
  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  //onSearch is declared in evens-search
  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find awesome programming events to attend and network"
        />
      </Head>
      <p>pages/events/index</p>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
