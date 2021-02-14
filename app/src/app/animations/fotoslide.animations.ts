import { trigger, transition, animate, style, state, keyframes } from '@angular/animations';

export const fotoSlide = [
    trigger('thumbState', [
        state('inactive', style({
            opacity: 0.0, transform: 'scale(0.5)'
        })),
        state('active', style({
            opacity: 1, transform: 'scale(1)'
        })),
        transition('inactive => active', animate('500ms cubic-bezier(0.785, 0.135, 0.15, 0.86)')),
        transition('active => inactive', animate('500ms cubic-bezier(0.785, 0.135, 0.15, 0.86)'))
])
];
