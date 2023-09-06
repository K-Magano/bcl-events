import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import ErrorAlert from "@/components/ui/error-alert";
import { getEventById, getAllEvents } from "../../helpers/api-util";

import { Fragment } from "react";

function EventDetailPage(props) {
  const event = props.selectedEvent; //from async at the bottom

  console.log("e: ", event);

  if (!event) {
    return (
      <ErrorAlert>
        <h3> Event not found</h3>;
      </ErrorAlert>
    );
  }
  return (
    //all components below were created by the lesson.
    <Fragment>
      <p>We are in pages/events/[eventid]</p>

      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        location={event.location}
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
  const event = await getAllEvents(eventId);
  return {
    props: {
      selectedEvent: event,
    },
  };
}
//to help next know what eventid (param values)to look out for

export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: false,
  };
}

export default EventDetailPage;
