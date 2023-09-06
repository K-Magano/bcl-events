import { Fragment } from "react";

import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import ErrorAlert from "@/components/ui/error-alert";

function EventDetailPage(props) {
  const event = props.selectedEvent; //from async at the bottom

  if (!event) {
    return (
      <div className="center">
        <h2>Loading..from [eventid]</h2>
      </div>
    );
  }

  return (
    //all components below were created by the lesson.
    <Fragment>
      <p>We are in pages/events/[eventid]</p>

      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}
//context because we need a specific id
export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}
//to help next know what eventid (param values)to look out for

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: "blocking", //there are more pages than prepared
  };
}

export default EventDetailPage;
