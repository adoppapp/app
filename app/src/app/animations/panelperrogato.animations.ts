import { trigger, transition, animate, style, state, keyframes } from '@angular/animations';

export const Panelperrogato = [
    trigger('estadoPerroGato', [
        state('activo',
            style({
                transform: 'translatex(140px) ',
            })
        ),
        state('inicial',
            style({
                transform: 'translatex(0px)',
            })
        ),
        transition('inicial => activo', animate('500ms ease-in', keyframes([
            style({ opacity: 1, transform: 'translatex(0px)', offset: 0 }),
            style({ opacity: 1, transform: 'translatex(-10px)', offset: 0.2 }),
            style({ opacity: 1, transform: 'translatex(140px)', offset: 0.5 }),
            style({ opacity: 1, transform: 'translatex(100px)', offset: 0.6 }),
            style({ opacity: 1, transform: 'translatex(120px)', offset: 0.8 })
        ]))),
        transition('activo => inicial', animate('500ms ease-out', keyframes([
            style({ opacity: 1, transform: 'translatex(140px)', offset: 0 }),
            style({ opacity: 1, transform: 'translatex(-30px)', offset: 0.5 }),
            style({ opacity: 1, transform: 'translatex(20px)', offset: 0.7 }),
            style({ opacity: 1, transform: 'translatex(-10px)', offset: 0.9 })
        ])))
    ]),
    trigger('iconoPerroGato', [
        state('activo',
            style({
                transform: 'rotate(180deg)',
            })
        ),
        state('inicial',
            style({
                transform: 'rotate(0deg)',
            })
        ),
        transition('inicial <=> activo', animate('1000ms linear'))
    ])
];
