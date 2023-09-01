import { useRouter } from "next/router";
import { Fragment } from "react";

import { getAllEvents } from "@/dummy-data";
import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";

function AllEventsPage() {
  //Help function that is declared in the Dummy data file.
  const router = useRouter();
  const events = getAllEvents();

  //two or more slashes it uses ... slug file redirection
  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  //onSearch is declared in evens-search
  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export default AllEventsPage;
