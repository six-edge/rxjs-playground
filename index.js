// Import stylesheets
import './style.css';
import { Subject, take, interval, map } from 'rxjs';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `
<h1>JS Starter</h1>
<p>RxJs Example</p>
`;

const subject = new Subject();

subject.subscribe({
  next: (v) => console.log(`observerA`, v),
  error: (err) => console.error(`observerA err`, err),
  complete: (v) => console.log(`observerA complete`),
});
subject.subscribe({
  next: (v) => console.log('observerB', v),
  error: (err) => console.error(`observerB err`, err),
  complete: (v) => console.log(`observerB complete`),
});

const keepAlive$ = interval(3000).pipe(
  map((count) => ({ message: 'KeepAlive', count })),
  take(3)
);

// Subscribe providing a Subject
// When subscribed to KeepAlive it starts to emit values
// which uses next() to send values to the Subject
// enabling KeepAlive to be a data source
keepAlive$.subscribe(subject);

subject.next({ Message: 'Init' });

console.log('subscribers', subject.observed ? 'yes' : 'no');
