import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";
import { getFeaturedEvents } from "../helpers/api-util";
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
      <p> in Pages/ index. using getStaticProps to fetch data</p>

      <EventsSearch />
      <EventList items={props.events} />
    </Fragment>
  );
}

export default HomePage;

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
