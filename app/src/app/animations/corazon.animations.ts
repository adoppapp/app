import { trigger, transition, animate, style, state, keyframes } from '@angular/animations';

export const corazon = [
    trigger('thumbState', [
        state('inactive', style({
            opacity: 0.0, transform: 'scale(0.5)'
        })),
        state('active', style({
            opacity: 1, transform: 'scale(1)'
        })),
        transition('inactive => active', animate('100ms ease-in')),
        transition('active => inactive', animate('100ms ease-out'))
]),
   trigger('thumbStaterevez', [
       state('inactive', style({
           opacity: 1, transform: 'scale(1)'
       })),
       state('active', style({
           opacity: 0.0, transform: 'scale(0.1)'
       })),
       transition('inactive => active', animate('100ms ease-out')),
       transition('active => inactive', animate('100ms ease-in'))
   ])
];
