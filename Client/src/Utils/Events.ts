import { v1 as uuidv1 } from 'uuid';

const now = new Date();

export default [
  {
    id: uuidv1(),
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2020, 2, 0),
    end: new Date(2020, 2, 1)
  },
  {
    id: uuidv1(),
    title: 'Long Event',
    start: new Date(2020, 2, 7),
    end: new Date(2020, 2, 10)
  },

  {
    id: uuidv1(),
    title: 'DTS STARTS',
    start: new Date(2020, 2, 13, 0, 0, 0),
    end: new Date(2020, 2, 20, 0, 0, 0)
  },

  {
    id: 3,
    title: 'DTS ENDS',
    start: new Date(2020, 2, 6, 0, 0, 0),
    end: new Date(2020, 2, 13, 0, 0, 0)
  },

  {
    id: uuidv1(),
    title: 'Some Event',
    start: new Date(2020, 2, 9, 0, 0, 0),
    end: new Date(2020, 2, 10, 0, 0, 0)
  },
  {
    id: uuidv1(),
    title: 'Conference',
    start: new Date(2020, 3, 19),
    end: new Date(2020, 3, 20),
    desc: 'Big conference for important people'
  },
  {
    id: uuidv1(),
    title: 'Meeting',
    start: new Date(2020, 2, 12, 10, 30, 0, 0),
    end: new Date(2020, 2, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting'
  },
  {
    id: uuidv1(),
    title: 'Lunch',
    start: new Date(2020, 2, 12, 12, 0, 0, 0),
    end: new Date(2020, 2, 12, 13, 0, 0, 0),
    desc: 'Power lunch'
  },
  {
    id: uuidv1(),
    title: 'Meeting',
    start: new Date(2020, 2, 12, 14, 0, 0, 0),
    end: new Date(2020, 2, 12, 15, 0, 0, 0)
  },
  {
    id: uuidv1(),
    title: 'Happy Hour',
    start: new Date(2020, 2, 12, 17, 0, 0, 0),
    end: new Date(2020, 2, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day'
  },
  {
    id: uuidv1(),
    title: 'Dinner',
    start: new Date(2020, 2, 12, 20, 0, 0, 0),
    end: new Date(2020, 2, 12, 21, 0, 0, 0)
  },
  {
    id: uuidv1(),
    title: 'Birthday Party',
    start: new Date(2020, 2, 13, 7, 0, 0),
    end: new Date(2020, 2, 13, 10, 30, 0)
  },
  {
    id: uuidv1(),
    title: 'Late Night Event',
    start: new Date(2020, 2, 17, 19, 30, 0),
    end: new Date(2020, 2, 18, 2, 0, 0)
  },
  {
    id: uuidv1(),
    title: 'Late Same Night Event',
    start: new Date(2020, 2, 17, 19, 30, 0),
    end: new Date(2020, 2, 17, 23, 30, 0)
  },
  {
    id: uuidv1(),
    title: 'Multi-day Event',
    start: new Date(2020, 2, 20, 19, 30, 0),
    end: new Date(2020, 2, 22, 2, 0, 0)
  },
  {
    id: uuidv1(),
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3))
  },
  {
    id: uuidv1(),
    title: 'Point in Time Event',
    start: now,
    end: now
  },
  {
    id: uuidv1(),
    title: 'Video Record',
    start: new Date(2020, 2, 14, 15, 30, 0),
    end: new Date(2020, 2, 14, 19, 0, 0)
  },
  {
    id: uuidv1(),
    title: 'Dutch Song Producing',
    start: new Date(2020, 3, 14, 16, 30, 0),
    end: new Date(2020, 3, 14, 20, 0, 0)
  },
  {
    id: uuidv1(),
    title: 'Itaewon Halloween Meeting',
    start: new Date(2020, 3, 14, 16, 30, 0),
    end: new Date(2020, 3, 14, 17, 30, 0)
  },
  {
    id: uuidv1(),
    title: 'Online Coding Test',
    start: new Date(2020, 3, 14, 17, 30, 0),
    end: new Date(2020, 3, 14, 20, 30, 0)
  },
  {
    id: uuidv1(),
    title: 'An overlapped Event',
    start: new Date(2020, 3, 14, 17, 0, 0),
    end: new Date(2020, 3, 14, 18, 30, 0)
  },
  {
    id: uuidv1(),
    title: 'Phone Interview',
    start: new Date(2020, 3, 14, 17, 0, 0),
    end: new Date(2020, 3, 14, 18, 30, 0)
  },
  {
    id: uuidv1(),
    title: 'Cooking Class',
    start: new Date(2020, 3, 14, 17, 30, 0),
    end: new Date(2020, 3, 14, 19, 0, 0)
  },
  {
    id: uuidv1(),
    title: 'Go to the gym',
    start: new Date(2020, 3, 14, 18, 30, 0),
    end: new Date(2020, 3, 14, 20, 0, 0)
  }
];
