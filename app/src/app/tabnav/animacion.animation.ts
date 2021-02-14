import { trigger, transition, animate, style, state } from '@angular/animations';


export const Seleccion = [
    trigger('seleccionado', [
        state('ok',
            style({
                transform: 'translatey(-4px) scale(1) ', background: '{{coloractivo}}', boxShadow: '0px 4px 4px black'
            }), { params: { coloractivo: 'ffffff' } }
        ),
        state('inicial',
            style({
                transform: 'scale(0.8)', fill: '{{colorinactivo}}', background: '{{colorinactivo}}', boxShadow: '0px 0px 0px black'
            }), { params: { colorinactivo: 'ffffff' } }
        ),
        transition('ok => inicial', animate('200ms ease-In')),
        transition('inicial => ok', animate('200ms ease-in'))
    ])];
