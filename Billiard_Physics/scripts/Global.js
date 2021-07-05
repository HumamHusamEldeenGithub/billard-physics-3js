export var DELTA_TIME = 1 / 144;

export var BALL_RADIUS = 0.8;

export var BALL_MASS = 0.16;

export var GRAVITY = 9.81;

export var BOUNCINESS = 0.9;

export var CIRCUMFERENCE = Math.PI * 2 * BALL_RADIUS;

export var POWER = 100;

export var WEIGHT = BALL_MASS * GRAVITY;

export var STATIC_FRICTION_COEFFICIENT = 0.08;

export var KINETIC_FRICTION_COEFFICIENT = 0.35;

export var THERMAL_ENERGY = 0.05;

export var WALL_LOSS_ENERGY = 0.135;

export var SCALER = 6.25;


export function setValue(name, value) {
    switch (name) {
        case 'BALL_RADIUS':
            BALL_RADIUS = value;
            break;
        case 'BALL_MASS':
            BALL_MASS = value;
            break;
        case 'POWER':
            POWER = value;
            break;
        case 'STATIC_FRICTION_COEFFICIENT':
            STATIC_FRICTION_COEFFICIENT = value;
            break;
        case 'KINETIC_FRICTION_COEFFICIENT':
            KINETIC_FRICTION_COEFFICIENT = value;
            break;
        case 'GRAVITY':
            GRAVITY = value;
            break;
        case 'THERMAL_ENERGY':
            THERMAL_ENERGY = value;
            break;
        case 'WALL_LOSS_ENERGY':
            WALL_LOSS_ENERGY = value;
            break;
    }
}