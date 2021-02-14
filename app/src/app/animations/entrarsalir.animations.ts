import { trigger, transition, animate, style, state, keyframes, query, stagger } from '@angular/animations';

export const entrarsalir = [
    [

        trigger('listAnimation', [
            transition('* => *', [

                query(':enter', style({ opacity: 0 }), { optional: true }),

                query(':enter', stagger('300ms', [
                    animate('1s ease-in', keyframes([
                        style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
                        style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
                        style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
                    ]))]), { optional: true }),
                query(':leave', stagger('300ms', [
                    animate('1s ease-in', keyframes([
                        style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
                        style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
                        style({ opacity: 0, transform: 'translateY(-75%)', offset: 1.0 }),
                    ]))]), { optional: true })

            ])
        ]),
    ]
];
