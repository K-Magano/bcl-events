import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import ErrorAlert from "@/components/ui/error-alert";
import { getEventById } from "@/dummy-data";
import { useRouter } from "next/router";
import { Fragment } from "react";

function EventDetailPage(events) {
  const router = useRouter();
  const eventId = router.query.eventId;
  const event = getEventById(eventId);

  if (!eventId) {
    return (
      <ErrorAlert>
        <h3> Event not found</h3>;
      </ErrorAlert>
    );
  }
  return (
    //all components below were created by the lesson.
    <Fragment>
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

export default EventDetailPage;
