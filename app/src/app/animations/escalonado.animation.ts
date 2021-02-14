import { trigger, transition, animate, style, query, stagger, keyframes } from '@angular/animations';
export const escalonado = [
//  // Trigger animation cards array
trigger('cardAnimation', [
    // Transition from any state to any state
    transition('* => *', [
        // Initially the all cards are not visible
        query(':enter', style({ opacity: 0 }), { optional: true }),
        // Each card will appear sequentially with the delay of 300ms
        query(':enter', stagger('200ms', [
            animate('.5s ease-in', keyframes([
                style({ opacity: 1, offset: 1 }),
            ]))]), { optional: true }),

        // Cards will disappear sequentially with the delay of 300ms
        query(':leave', stagger('100ms', [
            animate('50ms ease-out', keyframes([
                style({ opacity: 0,  offset: 1 }),
            ]))]), { optional: true })
    ]),
]),

    // Trigger animation for plus button
    trigger('plusAnimation', [
        // Transition from any state to any state
        transition('* => *', [
            query('.plus-card', style({ opacity: 0, transform: 'translateY(-40px)' })),
            query('.plus-card', stagger('300ms', [
                animate('300ms 1.1s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
            ])),
        ])
    ])
];

