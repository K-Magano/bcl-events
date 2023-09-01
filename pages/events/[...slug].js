import EventList from "@/components/events/event-list";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { getFilteredEvents } from "@/dummy-data";
import { useRouter } from "next/router";
import { Fragment } from "react";

function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;
  //undefined is also logged because of how rout data is extracted,  router runs after the components was render the first time.
  //console.log(filterData);

  if (!filterData) {
    // when it is undefined, which happens when the data is loaded the 1st time
    return <p className="center" /*in global css*/>Loading..</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  /*The filtered data is always a string.
   To convert it to numbers use + */
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    !isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>What?! No way, please check search dates </p>
        </ErrorAlert>

        <div className="center">
          <Button link="/events">Show all events.</Button>
        </div>
      </Fragment>
    );
  }

  /* we imported this function*/
  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          {" "}
          <p>
            You sure about that, because I found no events for the chosen dates
          </p>
        </ErrorAlert>

        <div className="center">
          <Button link="/events">Show all events.</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);
  return (
    <Fragment>
      {" "}
      <h2>Filtered Events</h2>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;
