import React, { useMemo, useState } from 'react';

const EQ = {
  none: 'none',
  treadmill: 'treadmill',
  elliptical: 'elliptical',
  stationary_bike: 'stationary_bike',
  stair_climber: 'stair_climber',
  arc_trainer: 'arc_trainer',
  leg_press: 'leg_press',
  leg_curl: 'leg_curl',
  leg_extension: 'leg_extension',
  hip_abduction: 'hip_abduction',
  hip_adduction: 'hip_adduction',
  chest_press: 'chest_press',
  pec_fly: 'pec_fly',
  shoulder_press: 'shoulder_press',
  lat_pulldown: 'lat_pulldown',
  seated_row: 'seated_row',
  cable_machine: 'cable_machine',
  smith_machine: 'smith_machine',
  assisted_pullup: 'assisted_pullup',
  ab_crunch_machine: 'ab_crunch_machine',
  dumbbells: 'dumbbells_up_to_75lbs',
  barbells: 'barbells_limited',
  ez_curl_bar: 'ez_curl_bar',
  resistance_bands: 'resistance_bands',
  bench: 'bench',
  yoga_mats: 'yoga_mats',
  foam_rollers: 'foam_rollers',
  stability_balls: 'stability_balls',
  kettlebell: 'kettlebell',
  jump_rope: 'jump_rope',
  medicine_ball: 'medicine_ball',
  pullup_bar: 'pullup_bar',
  box: 'box',
  stairs: 'stairs',
  step: 'step',
  chair: 'chair',
  track: 'track',
  hill: 'hill',
};

const EQUIPMENT_CATALOG = {
  [EQ.none]: { label: 'Bodyweight' },
  [EQ.treadmill]: { label: 'Treadmill' },
  [EQ.elliptical]: { label: 'Elliptical' },
  [EQ.stationary_bike]: { label: 'Stationary bike' },
  [EQ.stair_climber]: { label: 'Stair climber' },
  [EQ.arc_trainer]: { label: 'Arc trainer' },
  [EQ.leg_press]: { label: 'Leg press' },
  [EQ.leg_curl]: { label: 'Leg curl' },
  [EQ.leg_extension]: { label: 'Leg extension' },
  [EQ.hip_abduction]: { label: 'Hip abduction' },
  [EQ.hip_adduction]: { label: 'Hip adduction' },
  [EQ.chest_press]: { label: 'Chest press machine' },
  [EQ.pec_fly]: { label: 'Pec fly machine' },
  [EQ.shoulder_press]: { label: 'Shoulder press machine' },
  [EQ.lat_pulldown]: { label: 'Lat pulldown' },
  [EQ.seated_row]: { label: 'Seated row machine' },
  [EQ.cable_machine]: { label: 'Cable machine' },
  [EQ.smith_machine]: { label: 'Smith machine' },
  [EQ.assisted_pullup]: { label: 'Assisted pull-up' },
  [EQ.ab_crunch_machine]: { label: 'Ab crunch machine' },
  [EQ.dumbbells]: { label: 'Dumbbells' },
  [EQ.barbells]: { label: 'Barbells' },
  [EQ.ez_curl_bar]: { label: 'EZ curl bar' },
  [EQ.resistance_bands]: { label: 'Resistance bands' },
  [EQ.bench]: { label: 'Bench' },
  [EQ.yoga_mats]: { label: 'Yoga mat' },
  [EQ.foam_rollers]: { label: 'Foam roller' },
  [EQ.stability_balls]: { label: 'Stability ball' },
  [EQ.kettlebell]: { label: 'Kettlebell' },
  [EQ.jump_rope]: { label: 'Jump rope' },
  [EQ.medicine_ball]: { label: 'Medicine ball' },
  [EQ.pullup_bar]: { label: 'Pull-up bar' },
  [EQ.box]: { label: 'Plyo box' },
  [EQ.stairs]: { label: 'Stairs' },
  [EQ.step]: { label: 'Step' },
  [EQ.chair]: { label: 'Chair' },
  [EQ.track]: { label: 'Track/field' },
  [EQ.hill]: { label: 'Hill' },
};

const GYM_EQUIPMENT_PROFILES = {
  planet_fitness: [
    EQ.treadmill,
    EQ.elliptical,
    EQ.stationary_bike,
    EQ.stair_climber,
    EQ.arc_trainer,
    EQ.leg_press,
    EQ.leg_curl,
    EQ.leg_extension,
    EQ.hip_abduction,
    EQ.hip_adduction,
    EQ.chest_press,
    EQ.pec_fly,
    EQ.shoulder_press,
    EQ.lat_pulldown,
    EQ.seated_row,
    EQ.cable_machine,
    EQ.smith_machine,
    EQ.assisted_pullup,
    EQ.ab_crunch_machine,
    EQ.dumbbells,
    EQ.barbells,
    EQ.ez_curl_bar,
    EQ.resistance_bands,
    EQ.bench,
    EQ.yoga_mats,
    EQ.foam_rollers,
    EQ.stability_balls,
  ],
  la_fitness: [
    EQ.treadmill,
    EQ.elliptical,
    EQ.stationary_bike,
    EQ.stair_climber,
    EQ.arc_trainer,
    EQ.leg_press,
    EQ.leg_curl,
    EQ.leg_extension,
    EQ.hip_abduction,
    EQ.hip_adduction,
    EQ.chest_press,
    EQ.pec_fly,
    EQ.shoulder_press,
    EQ.lat_pulldown,
    EQ.seated_row,
    EQ.cable_machine,
    EQ.smith_machine,
    EQ.assisted_pullup,
    EQ.ab_crunch_machine,
    EQ.dumbbells,
    EQ.barbells,
    EQ.ez_curl_bar,
    EQ.kettlebell,
    EQ.medicine_ball,
    EQ.jump_rope,
    EQ.pullup_bar,
    EQ.box,
    EQ.resistance_bands,
    EQ.bench,
    EQ.yoga_mats,
    EQ.foam_rollers,
    EQ.stability_balls,
  ],
  '24_hour': [
    EQ.treadmill,
    EQ.elliptical,
    EQ.stationary_bike,
    EQ.stair_climber,
    EQ.arc_trainer,
    EQ.leg_press,
    EQ.leg_curl,
    EQ.leg_extension,
    EQ.hip_abduction,
    EQ.hip_adduction,
    EQ.chest_press,
    EQ.pec_fly,
    EQ.shoulder_press,
    EQ.lat_pulldown,
    EQ.seated_row,
    EQ.cable_machine,
    EQ.smith_machine,
    EQ.assisted_pullup,
    EQ.ab_crunch_machine,
    EQ.dumbbells,
    EQ.barbells,
    EQ.ez_curl_bar,
    EQ.kettlebell,
    EQ.medicine_ball,
    EQ.jump_rope,
    EQ.pullup_bar,
    EQ.box,
    EQ.resistance_bands,
    EQ.bench,
    EQ.yoga_mats,
    EQ.foam_rollers,
    EQ.stability_balls,
  ],
  anytime: [
    EQ.treadmill,
    EQ.elliptical,
    EQ.stationary_bike,
    EQ.stair_climber,
    EQ.leg_press,
    EQ.leg_curl,
    EQ.leg_extension,
    EQ.chest_press,
    EQ.shoulder_press,
    EQ.lat_pulldown,
    EQ.seated_row,
    EQ.cable_machine,
    EQ.smith_machine,
    EQ.dumbbells,
    EQ.barbells,
    EQ.ez_curl_bar,
    EQ.resistance_bands,
    EQ.bench,
    EQ.yoga_mats,
  ],
  ymca: [
    EQ.treadmill,
    EQ.elliptical,
    EQ.stationary_bike,
    EQ.stair_climber,
    EQ.leg_press,
    EQ.leg_curl,
    EQ.leg_extension,
    EQ.chest_press,
    EQ.shoulder_press,
    EQ.lat_pulldown,
    EQ.seated_row,
    EQ.cable_machine,
    EQ.smith_machine,
    EQ.assisted_pullup,
    EQ.dumbbells,
    EQ.barbells,
    EQ.ez_curl_bar,
    EQ.kettlebell,
    EQ.medicine_ball,
    EQ.jump_rope,
    EQ.pullup_bar,
    EQ.resistance_bands,
    EQ.bench,
    EQ.yoga_mats,
  ],
  other: [],
};

const SETTING_EQUIPMENT_DEFAULTS = {
  home: [EQ.chair, EQ.bench, EQ.step, EQ.yoga_mats],
  outdoor: [EQ.stairs, EQ.bench, EQ.hill, EQ.track],
};

const HOME_OPTIONAL_EQUIPMENT = [
  EQ.resistance_bands,
  EQ.jump_rope,
  EQ.kettlebell,
  EQ.pullup_bar,
  EQ.medicine_ball,
];

const OUTDOOR_OPTIONAL_EQUIPMENT = [
  EQ.resistance_bands,
  EQ.jump_rope,
  EQ.kettlebell,
  EQ.medicine_ball,
];

const OTHER_GYM_EQUIPMENT_OPTIONS = [
  EQ.treadmill,
  EQ.elliptical,
  EQ.stationary_bike,
  EQ.stair_climber,
  EQ.arc_trainer,
  EQ.leg_press,
  EQ.leg_curl,
  EQ.leg_extension,
  EQ.hip_abduction,
  EQ.hip_adduction,
  EQ.chest_press,
  EQ.pec_fly,
  EQ.shoulder_press,
  EQ.lat_pulldown,
  EQ.seated_row,
  EQ.cable_machine,
  EQ.smith_machine,
  EQ.assisted_pullup,
  EQ.ab_crunch_machine,
  EQ.dumbbells,
  EQ.barbells,
  EQ.ez_curl_bar,
  EQ.kettlebell,
  EQ.medicine_ball,
  EQ.jump_rope,
  EQ.pullup_bar,
  EQ.box,
  EQ.stairs,
  EQ.step,
  EQ.resistance_bands,
  EQ.bench,
  EQ.yoga_mats,
  EQ.foam_rollers,
  EQ.stability_balls,
];

const TAGS = {
  squat: 'squat',
  hinge: 'hinge',
  lunge: 'lunge',
  pushHorizontal: 'push_horizontal',
  pushVertical: 'push_vertical',
  pullHorizontal: 'pull_horizontal',
  pullVertical: 'pull_vertical',
  coreAntiExtension: 'core_anti_extension',
  coreAntiRotation: 'core_anti_rotation',
  coreRotation: 'core_rotation',
  coreLateral: 'core_lateral',
  carry: 'carry',
  calves: 'calves',
  quadIsolation: 'quad_isolation',
  hamstringIsolation: 'hamstring_isolation',
  gluteIsolation: 'glute_isolation',
  rearDelt: 'rear_delt',
  biceps: 'biceps',
  triceps: 'triceps',
  shoulders: 'shoulders',
  chestIsolation: 'chest_isolation',
  powerJump: 'power_jump',
  powerThrow: 'power_throw',
  powerHinge: 'power_hinge',
  lateral: 'lateral',
  speed: 'speed',
  agility: 'agility',
  cardioInterval: 'cardio_interval',
  cardioSteady: 'cardio_steady',
  cardioCircuit: 'cardio_circuit',
  mobilityHips: 'mobility_hips',
  mobilityTspine: 'mobility_tspine',
  mobilityAnkles: 'mobility_ankles',
  mobilityHamstrings: 'mobility_hamstrings',
  mobilityFull: 'mobility_full',
  breathing: 'breathing',
  recovery: 'recovery',
  balance: 'balance',
  eccentricHamstring: 'eccentric_hamstring',
  eccentricCalf: 'eccentric_calf',
  eccentricLunge: 'eccentric_lunge',
  eccentricPush: 'eccentric_push',
  isometricSquat: 'isometric_squat',
  isometricCalf: 'isometric_calf',
  isometricLunge: 'isometric_lunge',
  isometricCore: 'isometric_core',
  scapStability: 'scap_stability',
};

const EXERCISE_DATABASE = {
  fat_loss: {
    name: 'Fat Loss & Afterburn',
    description: 'High intensity intervals and metabolic conditioning to maximize EPOC',
    icon: '🔥',
    subgroups: {
      full_body: {
        name: 'Full Body Circuit',
        exercises: [
          {
            name: 'Kettlebell Swing',
            sets: '3-5',
            reps: '10-20',
            duration: null,
            equipment: [EQ.kettlebell],
            setting: ['gym', 'home'],
            patternTags: [TAGS.hinge, TAGS.powerHinge, TAGS.cardioCircuit],
          },
          {
            name: 'Dumbbell Thruster',
            sets: '3-4',
            reps: '8-12',
            duration: null,
            equipment: [EQ.dumbbells],
            setting: ['gym', 'home'],
            patternTags: [TAGS.squat, TAGS.pushVertical],
          },
          {
            name: 'Goblet Squat',
            sets: '3-4',
            reps: '10-15',
            duration: null,
            equipment: [EQ.dumbbells],
            setting: ['gym', 'home'],
            patternTags: [TAGS.squat],
          },
          {
            name: 'Walking Lunge',
            sets: '3-4',
            reps: '10-15 per leg',
            duration: null,
            equipment: [EQ.none, EQ.dumbbells],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.lunge],
          },
          {
            name: 'Push-up',
            sets: '3-4',
            reps: '8-15',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.pushHorizontal],
          },
          {
            name: 'Burpee',
            sets: '3-5',
            reps: '8-15',
            duration: '20-40 sec',
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.cardioCircuit, TAGS.powerJump],
          },
          {
            name: 'Mountain Climber',
            sets: '3-5',
            reps: '20-40 per leg',
            duration: '20-40 sec',
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.coreAntiExtension, TAGS.cardioCircuit],
          },
          {
            name: 'Jump Squat',
            sets: '3-5',
            reps: '6-10',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.squat, TAGS.powerJump],
          },
          {
            name: 'High Knees',
            sets: '6-10',
            reps: null,
            duration: '20-30 sec',
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.cardioCircuit],
          },
          {
            name: 'Skater Jumps',
            sets: '3-4',
            reps: '10-15 per side',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.powerJump, TAGS.lateral],
          },
          {
            name: 'Bear Crawl',
            sets: '3-4',
            reps: null,
            duration: '20-30 sec',
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.coreAntiExtension, TAGS.cardioCircuit],
          },
        ],
      },
      cardio_intervals: {
        name: 'Cardio Intervals',
        exercises: [
          {
            name: 'Treadmill Sprint Intervals',
            sets: '10-15 rounds',
            reps: null,
            duration: '30 sec fast / 60-90 sec walk',
            equipment: [EQ.treadmill],
            setting: ['gym'],
            patternTags: [TAGS.cardioInterval],
          },
          {
            name: 'Bike Sprints',
            sets: '10-20 rounds',
            reps: null,
            duration: '20-30 sec all out / 60-90 sec easy',
            equipment: [EQ.stationary_bike],
            setting: ['gym'],
            patternTags: [TAGS.cardioInterval],
          },
          {
            name: 'Stair Sprints',
            sets: '10-20 flights',
            reps: null,
            duration: 'walk down recovery',
            equipment: [EQ.stair_climber, EQ.stairs],
            setting: ['gym', 'outdoor'],
            patternTags: [TAGS.cardioInterval],
          },
          {
            name: 'Hill Sprints',
            sets: '8-12',
            reps: null,
            duration: '10-20 sec uphill, walk back',
            equipment: [EQ.hill],
            setting: ['outdoor'],
            patternTags: [TAGS.cardioInterval],
          },
          {
            name: 'Jump Rope Intervals',
            sets: '10-20 rounds',
            reps: null,
            duration: '30-45 sec fast / 30-45 sec easy',
            equipment: [EQ.jump_rope],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.cardioInterval],
          },
          {
            name: 'Elliptical Intervals',
            sets: '10-15 rounds',
            reps: null,
            duration: '30 sec hard / 60 sec easy',
            equipment: [EQ.elliptical],
            setting: ['gym'],
            patternTags: [TAGS.cardioInterval],
          },
          {
            name: 'Running Sprints',
            sets: '8-12',
            reps: null,
            duration: '15-30 sec sprint / 60-90 sec jog',
            equipment: [EQ.none],
            setting: ['outdoor'],
            patternTags: [TAGS.cardioInterval],
          },
          {
            name: 'Shuttle Runs',
            sets: '8-15',
            reps: null,
            duration: '20 sec work / 40 sec rest',
            equipment: [EQ.none],
            setting: ['outdoor', 'gym'],
            patternTags: [TAGS.cardioInterval, TAGS.agility],
          },
        ],
      },
      upper_body: {
        name: 'Upper Body Metabolic',
        exercises: [
          {
            name: 'Push-up Variations',
            sets: '3-5',
            reps: '8-20',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.pushHorizontal],
          },
          {
            name: 'Dumbbell Row',
            sets: '3-4',
            reps: '8-12 per arm',
            duration: null,
            equipment: [EQ.dumbbells],
            setting: ['gym', 'home'],
            patternTags: [TAGS.pullHorizontal],
          },
          {
            name: 'Dumbbell Shoulder Press',
            sets: '3-4',
            reps: '8-12',
            duration: null,
            equipment: [EQ.dumbbells],
            setting: ['gym', 'home'],
            patternTags: [TAGS.pushVertical],
          },
          {
            name: 'Plank to Push-up',
            sets: '3-4',
            reps: '8-12',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.coreAntiExtension, TAGS.pushHorizontal],
          },
          {
            name: 'Dumbbell Bench Press',
            sets: '3-4',
            reps: '10-15',
            duration: null,
            equipment: [EQ.dumbbells, EQ.bench],
            setting: ['gym', 'home'],
            patternTags: [TAGS.pushHorizontal],
          },
          {
            name: 'Band Pull-Apart',
            sets: '3-4',
            reps: '15-25',
            duration: null,
            equipment: [EQ.resistance_bands],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.pullHorizontal, TAGS.rearDelt],
          },
          {
            name: 'Diamond Push-ups',
            sets: '3-4',
            reps: '8-15',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.pushHorizontal, TAGS.triceps],
          },
        ],
      },
      lower_body: {
        name: 'Lower Body Metabolic',
        exercises: [
          {
            name: 'Goblet Squat',
            sets: '3-4',
            reps: '10-15',
            duration: null,
            equipment: [EQ.dumbbells],
            setting: ['gym', 'home'],
            patternTags: [TAGS.squat],
          },
          {
            name: 'Walking Lunge',
            sets: '3-4',
            reps: '12-20 steps',
            duration: null,
            equipment: [EQ.none, EQ.dumbbells],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.lunge],
          },
          {
            name: 'Step-up (Explosive)',
            sets: '3-4',
            reps: '10-15 per leg',
            duration: null,
            equipment: [EQ.bench, EQ.box, EQ.stairs, EQ.step],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.lunge, TAGS.powerJump],
          },
          {
            name: 'Jump Squat',
            sets: '3-5',
            reps: '8-12',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.squat, TAGS.powerJump],
          },
          {
            name: 'Kettlebell Swing',
            sets: '3-5',
            reps: '15-25',
            duration: null,
            equipment: [EQ.kettlebell],
            setting: ['gym', 'home'],
            patternTags: [TAGS.hinge, TAGS.powerHinge],
          },
          {
            name: 'Lateral Lunge',
            sets: '3-4',
            reps: '10-12 per leg',
            duration: null,
            equipment: [EQ.none, EQ.dumbbells],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.lunge, TAGS.lateral],
          },
          {
            name: 'Bodyweight Squat (Fast Tempo)',
            sets: '3-5',
            reps: '20-30',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.squat],
          },
          {
            name: 'Reverse Lunge',
            sets: '3-4',
            reps: '10-12 per leg',
            duration: null,
            equipment: [EQ.none, EQ.dumbbells],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.lunge],
          },
        ],
      },
    },
  },
  functional_strength: {
    name: 'Functional Strength',
    description: 'Movement-pattern based strength for daily function and resilience',
    icon: '💪',
    subgroups: {
      full_body: {
        name: 'Full Body',
        exercises: [
          {
            name: 'Goblet Squat',
            sets: '2-4',
            reps: '8-12',
            duration: null,
            equipment: [EQ.dumbbells],
            setting: ['gym', 'home'],
            patternTags: [TAGS.squat],
          },
          {
            name: 'Romanian Deadlift',
            sets: '3-4',
            reps: '6-10',
            duration: null,
            equipment: [EQ.dumbbells, EQ.barbells],
            setting: ['gym', 'home'],
            patternTags: [TAGS.hinge],
          },
          {
            name: 'Push-up',
            sets: '3-4',
            reps: '8-15',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.pushHorizontal],
          },
          {
            name: 'Dumbbell Row',
            sets: '3-4',
            reps: '8-12 per arm',
            duration: null,
            equipment: [EQ.dumbbells],
            setting: ['gym', 'home'],
            patternTags: [TAGS.pullHorizontal],
          },
          {
            name: "Farmer's Carry",
            sets: '3-5',
            reps: null,
            duration: '20-40 meters',
            equipment: [EQ.dumbbells],
            setting: ['gym', 'home'],
            patternTags: [TAGS.carry],
          },
          {
            name: 'Plank',
            sets: '3-5',
            reps: null,
            duration: '20-45 sec',
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.coreAntiExtension],
          },
          {
            name: 'Glute Bridge',
            sets: '3-4',
            reps: '12-15',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.hinge, TAGS.gluteIsolation],
          },
          {
            name: 'Dead Bug',
            sets: '3',
            reps: '8-12 per side',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.coreAntiExtension],
          },
          {
            name: 'Step-up',
            sets: '3',
            reps: '10-12 per leg',
            duration: null,
            equipment: [EQ.bench, EQ.box, EQ.stairs, EQ.step],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.lunge],
          },
        ],
      },
      upper_body: {
        name: 'Upper Body',
        exercises: [
          {
            name: 'Floor Push-up',
            sets: '3-4',
            reps: '8-15',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.pushHorizontal],
          },
          {
            name: 'Dumbbell Bench Press',
            sets: '3-4',
            reps: '8-12',
            duration: null,
            equipment: [EQ.dumbbells, EQ.bench],
            setting: ['gym', 'home'],
            patternTags: [TAGS.pushHorizontal],
          },
          {
            name: 'Dumbbell Shoulder Press',
            sets: '3-4',
            reps: '8-12',
            duration: null,
            equipment: [EQ.dumbbells],
            setting: ['gym', 'home'],
            patternTags: [TAGS.pushVertical],
          },
          {
            name: 'Lat Pulldown',
            sets: '3-4',
            reps: '8-12',
            duration: null,
            equipment: [EQ.lat_pulldown],
            setting: ['gym'],
            patternTags: [TAGS.pullVertical],
          },
          {
            name: 'Seated Cable Row',
            sets: '3-4',
            reps: '8-12',
            duration: null,
            equipment: [EQ.cable_machine],
            setting: ['gym'],
            patternTags: [TAGS.pullHorizontal],
          },
          {
            name: 'Band Row',
            sets: '3',
            reps: '12-15',
            duration: null,
            equipment: [EQ.resistance_bands],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.pullHorizontal],
          },
          {
            name: 'Push-up Plus',
            sets: '3',
            reps: '10-15',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.pushHorizontal, TAGS.scapStability],
          },
          {
            name: 'Dumbbell Curl',
            sets: '2-3',
            reps: '10-15',
            duration: null,
            equipment: [EQ.dumbbells],
            setting: ['gym', 'home'],
            patternTags: [TAGS.biceps],
          },
        ],
      },
      lower_body: {
        name: 'Lower Body',
        exercises: [
          {
            name: 'Bodyweight Squat',
            sets: '2-3',
            reps: '10-15',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.squat],
          },
          {
            name: 'Back Squat',
            sets: '3-4',
            reps: '6-10',
            duration: null,
            equipment: [EQ.smith_machine, EQ.barbells],
            setting: ['gym'],
            patternTags: [TAGS.squat],
          },
          {
            name: 'Step-up',
            sets: '3',
            reps: '8-12 per leg',
            duration: null,
            equipment: [EQ.bench, EQ.box, EQ.stairs, EQ.step],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.lunge],
          },
          {
            name: 'Split Squat',
            sets: '3',
            reps: '8-12 per leg',
            duration: null,
            equipment: [EQ.none, EQ.dumbbells],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.lunge],
          },
          {
            name: 'Leg Press',
            sets: '3-4',
            reps: '8-12',
            duration: null,
            equipment: [EQ.leg_press],
            setting: ['gym'],
            patternTags: [TAGS.squat],
          },
          {
            name: 'Hip Thrust',
            sets: '3-4',
            reps: '8-15',
            duration: null,
            equipment: [EQ.bench, EQ.dumbbells],
            setting: ['gym', 'home'],
            patternTags: [TAGS.hinge, TAGS.gluteIsolation],
          },
          {
            name: 'Glute Bridge',
            sets: '3-4',
            reps: '10-15',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.hinge, TAGS.gluteIsolation],
          },
          {
            name: 'Wall Sit',
            sets: '3',
            reps: null,
            duration: '30-60 sec',
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.isometricSquat, TAGS.squat],
          },
        ],
      },
      push: {
        name: 'Push Focus',
        exercises: [
          {
            name: 'Wall Push-up',
            sets: '2-3',
            reps: '10-15',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.pushHorizontal],
          },
          {
            name: 'Floor Push-up',
            sets: '3-4',
            reps: '8-15',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.pushHorizontal],
          },
          {
            name: 'Dumbbell Bench Press',
            sets: '3-4',
            reps: '6-10',
            duration: null,
            equipment: [EQ.dumbbells, EQ.bench],
            setting: ['gym', 'home'],
            patternTags: [TAGS.pushHorizontal],
          },
          {
            name: 'Dumbbell Shoulder Press',
            sets: '3-4',
            reps: '8-12',
            duration: null,
            equipment: [EQ.dumbbells],
            setting: ['gym', 'home'],
            patternTags: [TAGS.pushVertical],
          },
          {
            name: 'Machine Chest Press',
            sets: '3-4',
            reps: '8-12',
            duration: null,
            equipment: [EQ.chest_press],
            setting: ['gym'],
            patternTags: [TAGS.pushHorizontal],
          },
          {
            name: 'Pike Push-up',
            sets: '3',
            reps: '6-12',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.pushVertical],
          },
          {
            name: 'Diamond Push-up',
            sets: '3',
            reps: '8-15',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.pushHorizontal, TAGS.triceps],
          },
        ],
      },
      pull: {
        name: 'Pull Focus',
        exercises: [
          {
            name: 'Pull-up / Chin-up',
            sets: '3-5',
            reps: '3-8',
            duration: null,
            equipment: [EQ.assisted_pullup, EQ.pullup_bar],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.pullVertical],
          },
          {
            name: 'One-arm Dumbbell Row',
            sets: '3-4',
            reps: '8-12 per arm',
            duration: null,
            equipment: [EQ.dumbbells, EQ.bench],
            setting: ['gym', 'home'],
            patternTags: [TAGS.pullHorizontal],
          },
          {
            name: 'Seated Cable Row',
            sets: '3-4',
            reps: '8-12',
            duration: null,
            equipment: [EQ.cable_machine],
            setting: ['gym'],
            patternTags: [TAGS.pullHorizontal],
          },
          {
            name: 'Lat Pulldown',
            sets: '3-4',
            reps: '8-12',
            duration: null,
            equipment: [EQ.lat_pulldown],
            setting: ['gym'],
            patternTags: [TAGS.pullVertical],
          },
          {
            name: 'Band Row',
            sets: '3-4',
            reps: '12-15',
            duration: null,
            equipment: [EQ.resistance_bands],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.pullHorizontal],
          },
        ],
      },
    },
  },
  hypertrophy: {
    name: 'Bodybuilding / Hypertrophy',
    description: 'High volume resistance training for maximal muscle growth',
    icon: '🏆',
    subgroups: {
      upper_body: {
        name: 'Upper Body',
        exercises: [
          {
            name: 'Flat Dumbbell Bench Press',
            sets: '3-4',
            reps: '8-12',
            duration: null,
            equipment: [EQ.dumbbells, EQ.bench],
            setting: ['gym', 'home'],
            patternTags: [TAGS.pushHorizontal],
          },
          {
            name: 'Incline Dumbbell Press',
            sets: '3-4',
            reps: '8-12',
            duration: null,
            equipment: [EQ.dumbbells, EQ.bench],
            setting: ['gym', 'home'],
            patternTags: [TAGS.pushHorizontal],
          },
          {
            name: 'Machine Chest Press',
            sets: '3-4',
            reps: '8-12',
            duration: null,
            equipment: [EQ.chest_press],
            setting: ['gym'],
            patternTags: [TAGS.pushHorizontal],
          },
          {
            name: 'Cable Fly',
            sets: '3-4',
            reps: '10-15',
            duration: null,
            equipment: [EQ.cable_machine],
            setting: ['gym'],
            patternTags: [TAGS.chestIsolation],
          },
          {
            name: 'Lat Pulldown',
            sets: '3-5',
            reps: '8-12',
            duration: null,
            equipment: [EQ.lat_pulldown],
            setting: ['gym'],
            patternTags: [TAGS.pullVertical],
          },
          {
            name: 'Seated Cable Row',
            sets: '3-4',
            reps: '8-12',
            duration: null,
            equipment: [EQ.cable_machine],
            setting: ['gym'],
            patternTags: [TAGS.pullHorizontal],
          },
          {
            name: 'Seated Dumbbell Shoulder Press',
            sets: '3-4',
            reps: '8-12',
            duration: null,
            equipment: [EQ.dumbbells, EQ.bench],
            setting: ['gym', 'home'],
            patternTags: [TAGS.pushVertical],
          },
          {
            name: 'Lateral Raise',
            sets: '3-5',
            reps: '12-20',
            duration: null,
            equipment: [EQ.dumbbells],
            setting: ['gym', 'home'],
            patternTags: [TAGS.shoulders],
          },
          {
            name: 'Rear Delt Fly',
            sets: '3-4',
            reps: '12-20',
            duration: null,
            equipment: [EQ.dumbbells, EQ.cable_machine],
            setting: ['gym', 'home'],
            patternTags: [TAGS.rearDelt, TAGS.pullHorizontal],
          },
        ],
      },
      lower_body: {
        name: 'Lower Body',
        exercises: [
          {
            name: 'Leg Press',
            sets: '3-5',
            reps: '8-15',
            duration: null,
            equipment: [EQ.leg_press],
            setting: ['gym'],
            patternTags: [TAGS.squat],
          },
          {
            name: 'Smith Machine Squat',
            sets: '3-4',
            reps: '8-12',
            duration: null,
            equipment: [EQ.smith_machine],
            setting: ['gym'],
            patternTags: [TAGS.squat],
          },
          {
            name: 'Walking Lunge',
            sets: '3-4',
            reps: '10-15 per leg',
            duration: null,
            equipment: [EQ.dumbbells],
            setting: ['gym', 'home'],
            patternTags: [TAGS.lunge],
          },
          {
            name: 'Bulgarian Split Squat',
            sets: '3-4',
            reps: '8-12 per leg',
            duration: null,
            equipment: [EQ.dumbbells, EQ.bench],
            setting: ['gym', 'home'],
            patternTags: [TAGS.lunge],
          },
          {
            name: 'Leg Extension',
            sets: '3-4',
            reps: '10-15',
            duration: null,
            equipment: [EQ.leg_extension],
            setting: ['gym'],
            patternTags: [TAGS.quadIsolation],
          },
          {
            name: 'Lying Leg Curl',
            sets: '3-4',
            reps: '10-15',
            duration: null,
            equipment: [EQ.leg_curl],
            setting: ['gym'],
            patternTags: [TAGS.hamstringIsolation],
          },
          {
            name: 'Hip Thrust',
            sets: '3-5',
            reps: '8-12',
            duration: null,
            equipment: [EQ.bench, EQ.dumbbells],
            setting: ['gym', 'home'],
            patternTags: [TAGS.gluteIsolation, TAGS.hinge],
          },
          {
            name: 'Goblet Squat',
            sets: '3-4',
            reps: '12-15',
            duration: null,
            equipment: [EQ.dumbbells],
            setting: ['gym', 'home'],
            patternTags: [TAGS.squat],
          },
        ],
      },
      push: {
        name: 'Push Day',
        exercises: [
          {
            name: 'Machine Chest Press',
            sets: '3-5',
            reps: '6-10',
            duration: null,
            equipment: [EQ.chest_press],
            setting: ['gym'],
            patternTags: [TAGS.pushHorizontal],
          },
          {
            name: 'Incline Dumbbell Press',
            sets: '3-4',
            reps: '8-12',
            duration: null,
            equipment: [EQ.dumbbells, EQ.bench],
            setting: ['gym', 'home'],
            patternTags: [TAGS.pushHorizontal],
          },
          {
            name: 'Flat Dumbbell Press',
            sets: '3-4',
            reps: '8-12',
            duration: null,
            equipment: [EQ.dumbbells, EQ.bench],
            setting: ['gym', 'home'],
            patternTags: [TAGS.pushHorizontal],
          },
          {
            name: 'Cable Fly',
            sets: '3-4',
            reps: '10-15',
            duration: null,
            equipment: [EQ.cable_machine],
            setting: ['gym'],
            patternTags: [TAGS.chestIsolation],
          },
          {
            name: 'Seated Dumbbell Shoulder Press',
            sets: '3-4',
            reps: '8-12',
            duration: null,
            equipment: [EQ.dumbbells, EQ.bench],
            setting: ['gym', 'home'],
            patternTags: [TAGS.pushVertical],
          },
          {
            name: 'Lateral Raise',
            sets: '3-5',
            reps: '12-20',
            duration: null,
            equipment: [EQ.dumbbells],
            setting: ['gym', 'home'],
            patternTags: [TAGS.shoulders],
          },
          {
            name: 'Triceps Pushdown',
            sets: '3-4',
            reps: '8-12',
            duration: null,
            equipment: [EQ.cable_machine],
            setting: ['gym'],
            patternTags: [TAGS.triceps],
          },
          {
            name: 'Push-up (Wide Grip)',
            sets: '3',
            reps: '12-20',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.pushHorizontal],
          },
        ],
      },
      pull: {
        name: 'Pull Day',
        exercises: [
          {
            name: 'Lat Pulldown',
            sets: '3-5',
            reps: '8-12',
            duration: null,
            equipment: [EQ.lat_pulldown],
            setting: ['gym'],
            patternTags: [TAGS.pullVertical],
          },
          {
            name: 'Seated Cable Row',
            sets: '3-4',
            reps: '8-12',
            duration: null,
            equipment: [EQ.cable_machine],
            setting: ['gym'],
            patternTags: [TAGS.pullHorizontal],
          },
          {
            name: 'One-arm Dumbbell Row',
            sets: '3-4',
            reps: '8-12 per arm',
            duration: null,
            equipment: [EQ.dumbbells, EQ.bench],
            setting: ['gym', 'home'],
            patternTags: [TAGS.pullHorizontal],
          },
          {
            name: 'Rear Delt Fly',
            sets: '3-4',
            reps: '12-20',
            duration: null,
            equipment: [EQ.dumbbells],
            setting: ['gym', 'home'],
            patternTags: [TAGS.rearDelt],
          },
          {
            name: 'Dumbbell Curl',
            sets: '3-4',
            reps: '10-12',
            duration: null,
            equipment: [EQ.dumbbells],
            setting: ['gym', 'home'],
            patternTags: [TAGS.biceps],
          },
          {
            name: 'Hammer Curl',
            sets: '3-4',
            reps: '10-12',
            duration: null,
            equipment: [EQ.dumbbells],
            setting: ['gym', 'home'],
            patternTags: [TAGS.biceps],
          },
          {
            name: 'Pull-up / Chin-up',
            sets: '3-5',
            reps: '6-12',
            duration: null,
            equipment: [EQ.assisted_pullup, EQ.pullup_bar],
            setting: ['gym', 'home'],
            patternTags: [TAGS.pullVertical],
          },
        ],
      },
      full_body: {
        name: 'Full Body Hypertrophy',
        exercises: [
          {
            name: 'Leg Press',
            sets: '3-4',
            reps: '10-15',
            duration: null,
            equipment: [EQ.leg_press],
            setting: ['gym'],
            patternTags: [TAGS.squat],
          },
          {
            name: 'Dumbbell Bench Press',
            sets: '3-4',
            reps: '8-12',
            duration: null,
            equipment: [EQ.dumbbells, EQ.bench],
            setting: ['gym', 'home'],
            patternTags: [TAGS.pushHorizontal],
          },
          {
            name: 'Lat Pulldown',
            sets: '3-4',
            reps: '8-12',
            duration: null,
            equipment: [EQ.lat_pulldown],
            setting: ['gym'],
            patternTags: [TAGS.pullVertical],
          },
          {
            name: 'Dumbbell Shoulder Press',
            sets: '3',
            reps: '10-12',
            duration: null,
            equipment: [EQ.dumbbells],
            setting: ['gym', 'home'],
            patternTags: [TAGS.pushVertical],
          },
          {
            name: 'Dumbbell Curl',
            sets: '2-3',
            reps: '10-12',
            duration: null,
            equipment: [EQ.dumbbells],
            setting: ['gym', 'home'],
            patternTags: [TAGS.biceps],
          },
          {
            name: 'Goblet Squat',
            sets: '3-4',
            reps: '12-15',
            duration: null,
            equipment: [EQ.dumbbells],
            setting: ['gym', 'home'],
            patternTags: [TAGS.squat],
          },
        ],
      },
    },
  },
  cardiac_health: {
    name: 'Cardiac Health & Endurance',
    description: 'Aerobic conditioning for heart health and stamina',
    icon: '❤️',
    subgroups: {
      steady_state: {
        name: 'Steady State Cardio',
        exercises: [
          {
            name: 'Brisk Walking',
            sets: '1',
            reps: null,
            duration: '30-60 min',
            equipment: [EQ.treadmill, EQ.none],
            setting: ['gym', 'outdoor'],
            patternTags: [TAGS.cardioSteady],
          },
          {
            name: 'Light Jogging',
            sets: '1',
            reps: null,
            duration: '20-45 min',
            equipment: [EQ.treadmill, EQ.none],
            setting: ['gym', 'outdoor'],
            patternTags: [TAGS.cardioSteady],
          },
          {
            name: 'Elliptical (Moderate)',
            sets: '1',
            reps: null,
            duration: '20-45 min',
            equipment: [EQ.elliptical],
            setting: ['gym'],
            patternTags: [TAGS.cardioSteady],
          },
          {
            name: 'Stationary Bike',
            sets: '1',
            reps: null,
            duration: '30-60 min',
            equipment: [EQ.stationary_bike],
            setting: ['gym'],
            patternTags: [TAGS.cardioSteady],
          },
          {
            name: 'Stair Climbing',
            sets: '1',
            reps: null,
            duration: '15-30 min',
            equipment: [EQ.stair_climber, EQ.stairs],
            setting: ['gym', 'outdoor'],
            patternTags: [TAGS.cardioSteady],
          },
        ],
      },
      intervals: {
        name: 'Cardio Intervals',
        exercises: [
          {
            name: 'Walk/Jog Intervals',
            sets: '8-12 rounds',
            reps: null,
            duration: '1 min jog / 2 min walk',
            equipment: [EQ.none, EQ.treadmill],
            setting: ['gym', 'outdoor'],
            patternTags: [TAGS.cardioInterval],
          },
          {
            name: 'Bike Intervals',
            sets: '8-12 rounds',
            reps: null,
            duration: '1 min hard / 2 min easy',
            equipment: [EQ.stationary_bike],
            setting: ['gym'],
            patternTags: [TAGS.cardioInterval],
          },
          {
            name: 'Elliptical Intervals',
            sets: '8-10 rounds',
            reps: null,
            duration: '1 min hard / 1.5 min easy',
            equipment: [EQ.elliptical],
            setting: ['gym'],
            patternTags: [TAGS.cardioInterval],
          },
          {
            name: 'Stair Intervals',
            sets: '8-12 flights',
            reps: null,
            duration: 'up fast, walk down',
            equipment: [EQ.stair_climber, EQ.stairs],
            setting: ['gym', 'outdoor'],
            patternTags: [TAGS.cardioInterval],
          },
          {
            name: 'Running Fartlek',
            sets: '1 session',
            reps: null,
            duration: '20-30 min with varied pace',
            equipment: [EQ.none],
            setting: ['outdoor'],
            patternTags: [TAGS.cardioInterval],
          },
        ],
      },
      circuit: {
        name: 'Cardio Circuit',
        exercises: [
          {
            name: 'Jumping Jacks',
            sets: '3',
            reps: null,
            duration: '30-45 sec',
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.cardioCircuit],
          },
          {
            name: 'High Knees',
            sets: '3',
            reps: null,
            duration: '30-45 sec',
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.cardioCircuit],
          },
          {
            name: 'Butt Kicks',
            sets: '3',
            reps: null,
            duration: '30-45 sec',
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.cardioCircuit],
          },
          {
            name: 'Marching in Place',
            sets: '3',
            reps: null,
            duration: '30-60 sec',
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.cardioCircuit],
          },
          {
            name: 'Step-ups',
            sets: '3',
            reps: null,
            duration: '45-60 sec',
            equipment: [EQ.bench, EQ.box, EQ.stairs, EQ.step],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.cardioCircuit, TAGS.lunge],
          },
          {
            name: 'Lateral Shuffle',
            sets: '3',
            reps: null,
            duration: '30-45 sec',
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.cardioCircuit, TAGS.agility],
          },
        ],
      },
    },
  },
  athleticism: {
    name: 'Athleticism & Power',
    description: 'Maximize speed, explosiveness, coordination, and performance',
    icon: '⚡',
    subgroups: {
      power: {
        name: 'Power Training',
        exercises: [
          {
            name: 'Box Jump',
            sets: '3-5',
            reps: '3-6',
            duration: null,
            equipment: [EQ.box, EQ.bench],
            setting: ['gym'],
            patternTags: [TAGS.powerJump],
          },
          {
            name: 'Countermovement Jump',
            sets: '3-5',
            reps: '3-6',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.powerJump],
          },
          {
            name: 'Broad Jump',
            sets: '3-5',
            reps: '3-5',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.powerJump],
          },
          {
            name: 'Medicine Ball Slam',
            sets: '3-5',
            reps: '5-10',
            duration: null,
            equipment: [EQ.medicine_ball],
            setting: ['gym'],
            patternTags: [TAGS.powerThrow],
          },
          {
            name: 'Kettlebell Swing (Explosive)',
            sets: '3-5',
            reps: '8-12',
            duration: null,
            equipment: [EQ.kettlebell],
            setting: ['gym', 'home'],
            patternTags: [TAGS.powerHinge],
          },
          {
            name: 'Split Squat Jump',
            sets: '3-4',
            reps: '4-6 per leg',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.powerJump, TAGS.lunge],
          },
          {
            name: 'Tuck Jump',
            sets: '3-4',
            reps: '4-6',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.powerJump],
          },
          {
            name: 'Lateral Bounds',
            sets: '3-4',
            reps: '4-8 per side',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.powerJump, TAGS.lateral],
          },
        ],
      },
      speed: {
        name: 'Speed & Agility',
        exercises: [
          {
            name: 'Short Sprints (10-20m)',
            sets: '6-10 sprints',
            reps: null,
            duration: 'full walk-back rest',
            equipment: [EQ.none, EQ.track],
            setting: ['outdoor', 'gym'],
            patternTags: [TAGS.speed],
          },
          {
            name: '30-60m Sprints',
            sets: '4-8',
            reps: null,
            duration: '1.5-3 min rest',
            equipment: [EQ.none, EQ.track],
            setting: ['outdoor'],
            patternTags: [TAGS.speed],
          },
          {
            name: 'Hill Sprints',
            sets: '6-10',
            reps: null,
            duration: '10-20 sec uphill, walk down',
            equipment: [EQ.hill],
            setting: ['outdoor'],
            patternTags: [TAGS.speed],
          },
          {
            name: 'Cone T-Drill',
            sets: '4-8 runs',
            reps: null,
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'outdoor'],
            patternTags: [TAGS.agility],
          },
          {
            name: '5-10-5 Shuttle',
            sets: '4-8 runs',
            reps: null,
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'outdoor'],
            patternTags: [TAGS.agility],
          },
          {
            name: 'Backpedal to Sprint',
            sets: '6-8',
            reps: null,
            duration: null,
            equipment: [EQ.none],
            setting: ['outdoor', 'gym'],
            patternTags: [TAGS.speed, TAGS.agility],
          },
          {
            name: 'Lateral Shuffle',
            sets: '6-10',
            reps: null,
            duration: '10-20m each direction',
            equipment: [EQ.none],
            setting: ['outdoor', 'gym'],
            patternTags: [TAGS.agility],
          },
        ],
      },
      strength_for_power: {
        name: 'Strength for Athletes',
        exercises: [
          {
            name: 'Back Squat',
            sets: '3-5',
            reps: '3-6',
            duration: null,
            equipment: [EQ.smith_machine, EQ.barbells],
            setting: ['gym'],
            patternTags: [TAGS.squat],
          },
          {
            name: 'Romanian Deadlift',
            sets: '3-4',
            reps: '6-8',
            duration: null,
            equipment: [EQ.dumbbells, EQ.barbells],
            setting: ['gym', 'home'],
            patternTags: [TAGS.hinge],
          },
          {
            name: 'Bulgarian Split Squat',
            sets: '3-4',
            reps: '6-10 per leg',
            duration: null,
            equipment: [EQ.dumbbells, EQ.bench],
            setting: ['gym', 'home'],
            patternTags: [TAGS.lunge],
          },
          {
            name: 'Dumbbell Bench Press',
            sets: '3-5',
            reps: '3-6',
            duration: null,
            equipment: [EQ.dumbbells, EQ.bench],
            setting: ['gym', 'home'],
            patternTags: [TAGS.pushHorizontal],
          },
          {
            name: 'Heavy Dumbbell Row',
            sets: '3-5',
            reps: '4-8',
            duration: null,
            equipment: [EQ.dumbbells, EQ.bench],
            setting: ['gym', 'home'],
            patternTags: [TAGS.pullHorizontal],
          },
        ],
      },
      full_body: {
        name: 'Full Body Power',
        exercises: [
          {
            name: 'Box Jump',
            sets: '4',
            reps: '3',
            duration: null,
            equipment: [EQ.box, EQ.bench],
            setting: ['gym'],
            patternTags: [TAGS.powerJump],
          },
          {
            name: 'Countermovement Jump',
            sets: '4',
            reps: '4',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.powerJump],
          },
          {
            name: 'Dumbbell Bench Press',
            sets: '4',
            reps: '3-5',
            duration: null,
            equipment: [EQ.dumbbells, EQ.bench],
            setting: ['gym', 'home'],
            patternTags: [TAGS.pushHorizontal],
          },
          {
            name: 'Heavy Dumbbell Row',
            sets: '3',
            reps: '6-8',
            duration: null,
            equipment: [EQ.dumbbells, EQ.bench],
            setting: ['gym', 'home'],
            patternTags: [TAGS.pullHorizontal],
          },
          {
            name: 'Broad Jump',
            sets: '3',
            reps: '4',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.powerJump],
          },
          {
            name: 'Kettlebell Swing',
            sets: '3',
            reps: '10',
            duration: null,
            equipment: [EQ.kettlebell],
            setting: ['gym', 'home'],
            patternTags: [TAGS.powerHinge],
          },
        ],
      },
    },
  },
  injury_prevention: {
    name: 'Injury Prevention',
    description: 'Reduce injury risk, increase tissue tolerance, and improve control',
    icon: '🛡️',
    subgroups: {
      eccentric: {
        name: 'Eccentric Strength',
        exercises: [
          {
            name: 'Nordic Hamstring Curl',
            sets: '2-3',
            reps: '4-8',
            duration: '3-6 sec eccentric',
            equipment: [EQ.bench, EQ.none],
            setting: ['gym', 'home'],
            patternTags: [TAGS.eccentricHamstring],
          },
          {
            name: 'Slow Eccentric Split Squat',
            sets: '2-3',
            reps: '6-8 per leg',
            duration: '4-5 sec lowering',
            equipment: [EQ.none, EQ.dumbbells],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.eccentricLunge],
          },
          {
            name: 'Tempo Romanian Deadlift',
            sets: '3',
            reps: '6-8',
            duration: '4 sec lowering',
            equipment: [EQ.dumbbells],
            setting: ['gym', 'home'],
            patternTags: [TAGS.eccentricHamstring],
          },
          {
            name: 'Eccentric Calf Raise',
            sets: '2-3',
            reps: '8-12',
            duration: '4 sec lowering',
            equipment: [EQ.step, EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.eccentricCalf],
          },
          {
            name: 'Eccentric Push-up',
            sets: '2-3',
            reps: '6-10',
            duration: '4-5 sec lowering',
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.eccentricPush],
          },
        ],
      },
      isometrics: {
        name: 'Isometrics & Tendon Health',
        exercises: [
          {
            name: 'Copenhagen Plank',
            sets: '2-3',
            reps: null,
            duration: '10-20 sec per side',
            equipment: [EQ.bench],
            setting: ['gym', 'home'],
            patternTags: [TAGS.coreLateral, TAGS.isometricCore],
          },
          {
            name: 'Mid-Range Isometric Squat',
            sets: '2-4',
            reps: null,
            duration: '20-45 sec',
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.isometricSquat],
          },
          {
            name: 'Isometric Calf Raise',
            sets: '2-4',
            reps: null,
            duration: '20-45 sec',
            equipment: [EQ.none, EQ.step],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.isometricCalf],
          },
          {
            name: 'Isometric Split Squat Hold',
            sets: '2-4',
            reps: null,
            duration: '20-45 sec per leg',
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.isometricLunge],
          },
          {
            name: 'Wall Sit',
            sets: '2-3',
            reps: null,
            duration: '30-60 sec',
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.isometricSquat],
          },
        ],
      },
      balance: {
        name: 'Balance & Proprioception',
        exercises: [
          {
            name: 'Single-Leg Stance (Eyes Open)',
            sets: '3-4',
            reps: null,
            duration: '20-40 sec per leg',
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.balance],
          },
          {
            name: 'Single-Leg Stance (Eyes Closed)',
            sets: '2-3',
            reps: null,
            duration: '15-30 sec per leg',
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.balance],
          },
          {
            name: 'Tandem Walking',
            sets: '3-4 passes',
            reps: '10-20 steps',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.balance],
          },
          {
            name: 'Single-Leg Romanian Deadlift',
            sets: '2-3',
            reps: '6-10 per leg',
            duration: null,
            equipment: [EQ.none, EQ.dumbbells],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.balance, TAGS.hinge],
          },
          {
            name: 'Clock Reaches (Single-Leg)',
            sets: '2-3',
            reps: '4-6 reaches per leg',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.balance],
          },
        ],
      },
      trunk_stability: {
        name: 'Trunk Stability',
        exercises: [
          {
            name: 'Pallof Press',
            sets: '2-3',
            reps: '8-15 per side',
            duration: null,
            equipment: [EQ.cable_machine, EQ.resistance_bands],
            setting: ['gym', 'home'],
            patternTags: [TAGS.coreAntiRotation],
          },
          {
            name: 'Dead Bug',
            sets: '2-3',
            reps: '8-12',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.coreAntiExtension],
          },
          {
            name: 'Bird Dog',
            sets: '2-3',
            reps: '8-12 per side',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.coreAntiExtension],
          },
          {
            name: 'Plank',
            sets: '2-4',
            reps: null,
            duration: '20-45 sec',
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.coreAntiExtension],
          },
          {
            name: 'Side Plank',
            sets: '2-3',
            reps: null,
            duration: '15-30 sec per side',
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.coreLateral],
          },
        ],
      },
      full_body: {
        name: 'Full Body Prevention',
        exercises: [
          {
            name: 'Nordic Hamstring Curl',
            sets: '2',
            reps: '4-6',
            duration: null,
            equipment: [EQ.bench, EQ.none],
            setting: ['gym', 'home'],
            patternTags: [TAGS.eccentricHamstring],
          },
          {
            name: 'Single-Leg Romanian Deadlift',
            sets: '2',
            reps: '8 per leg',
            duration: null,
            equipment: [EQ.dumbbells, EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.balance, TAGS.hinge],
          },
          {
            name: 'Single-Leg Stance',
            sets: '3',
            reps: null,
            duration: '30 sec per leg',
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.balance],
          },
          {
            name: 'Eccentric Calf Raise',
            sets: '2',
            reps: '10',
            duration: null,
            equipment: [EQ.step, EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.eccentricCalf],
          },
          {
            name: 'Dead Bug',
            sets: '2',
            reps: '10 per side',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.coreAntiExtension],
          },
        ],
      },
    },
  },
  longevity: {
    name: 'Longevity & Mobility',
    description: 'Long-term physical independence, balance, and healthspan',
    icon: '🌿',
    subgroups: {
      strength_light: {
        name: 'Light-Moderate Strength',
        exercises: [
          {
            name: 'Sit-to-Stand',
            sets: '2-3',
            reps: '10-15',
            duration: null,
            equipment: [EQ.chair, EQ.bench],
            setting: ['gym', 'home'],
            patternTags: [TAGS.squat],
          },
          {
            name: 'Wall Squat Hold',
            sets: '2-3',
            reps: null,
            duration: '20-40 sec',
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.isometricSquat],
          },
          {
            name: 'Band Chest Press',
            sets: '2-3',
            reps: '10-15',
            duration: null,
            equipment: [EQ.resistance_bands],
            setting: ['gym', 'home'],
            patternTags: [TAGS.pushHorizontal],
          },
          {
            name: 'Band Row',
            sets: '2-3',
            reps: '12-15',
            duration: null,
            equipment: [EQ.resistance_bands],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.pullHorizontal],
          },
          {
            name: 'Band Pull-Apart',
            sets: '2-3',
            reps: '12-20',
            duration: null,
            equipment: [EQ.resistance_bands],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.pullHorizontal, TAGS.rearDelt],
          },
          {
            name: 'Calf Raises (Bodyweight)',
            sets: '2-3',
            reps: '15-25',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.calves],
          },
          {
            name: 'Push-up (Wall or Incline)',
            sets: '2-3',
            reps: '8-15',
            duration: null,
            equipment: [EQ.none, EQ.bench],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.pushHorizontal],
          },
        ],
      },
      balance: {
        name: 'Balance & Coordination',
        exercises: [
          {
            name: 'Single-Leg Stance',
            sets: '3-4',
            reps: null,
            duration: '20-30 sec per leg',
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.balance],
          },
          {
            name: 'Tandem Stance',
            sets: '3-4',
            reps: null,
            duration: '20-30 sec',
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.balance],
          },
          {
            name: 'Tandem Walk',
            sets: '3-4 passes',
            reps: '10-20 steps',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.balance],
          },
          {
            name: 'Heel-Toe Walking Backwards',
            sets: '3-4 passes',
            reps: '10-20 steps',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.balance],
          },
          {
            name: 'Multi-Direction Mini Lunges',
            sets: '2-3',
            reps: '6-8 each direction',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.lunge, TAGS.balance],
          },
          {
            name: 'Clock Reach',
            sets: '2-3',
            reps: '6-8 per leg',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.balance],
          },
        ],
      },
      mobility: {
        name: 'Mobility & Stretching',
        exercises: [
          {
            name: 'Hamstring Stretch',
            sets: '2-4',
            reps: null,
            duration: '20-30 sec per leg',
            equipment: [EQ.none, EQ.yoga_mats],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.mobilityHamstrings],
          },
          {
            name: 'Hip Flexor Stretch',
            sets: '2-4',
            reps: null,
            duration: '20-30 sec per leg',
            equipment: [EQ.none, EQ.yoga_mats],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.mobilityHips],
          },
          {
            name: 'Glute/Piriformis Stretch',
            sets: '2-4',
            reps: null,
            duration: '20-30 sec per leg',
            equipment: [EQ.none, EQ.yoga_mats],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.mobilityHips],
          },
          {
            name: 'Calf Stretch',
            sets: '2-4',
            reps: null,
            duration: '20-30 sec per leg',
            equipment: [EQ.none, EQ.step],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.mobilityAnkles],
          },
          {
            name: 'Cat-Camel',
            sets: '2-3',
            reps: '8-12',
            duration: null,
            equipment: [EQ.yoga_mats, EQ.none],
            setting: ['gym', 'home'],
            patternTags: [TAGS.mobilityTspine],
          },
          {
            name: 'Thoracic Rotations',
            sets: '2-3',
            reps: '8-10 per side',
            duration: null,
            equipment: [EQ.yoga_mats, EQ.none],
            setting: ['gym', 'home'],
            patternTags: [TAGS.mobilityTspine],
          },
          {
            name: 'Hip Circles',
            sets: '2-3',
            reps: '10-15 each direction',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.mobilityHips],
          },
          {
            name: 'Yoga Sun Salutations',
            sets: '1',
            reps: '5-10 slow cycles',
            duration: null,
            equipment: [EQ.yoga_mats, EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.mobilityFull],
          },
        ],
      },
      breathing: {
        name: 'Breathing & Recovery',
        exercises: [
          {
            name: 'Nasal Breathing Walk',
            sets: '1',
            reps: null,
            duration: '10-20 min',
            equipment: [EQ.none],
            setting: ['outdoor', 'gym', 'home'],
            patternTags: [TAGS.breathing, TAGS.cardioSteady],
          },
          {
            name: 'Extended Exhale Breathing',
            sets: '1',
            reps: null,
            duration: '5-10 min',
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.breathing],
          },
          {
            name: 'Physiological Sigh Patterns',
            sets: '1',
            reps: '5-10 cycles',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.breathing],
          },
          {
            name: 'Foam Rolling',
            sets: '1',
            reps: null,
            duration: '5-15 min',
            equipment: [EQ.foam_rollers],
            setting: ['gym', 'home'],
            patternTags: [TAGS.recovery],
          },
          {
            name: 'Box Breathing',
            sets: '1',
            reps: '8-12 cycles',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.breathing],
          },
        ],
      },
      full_body: {
        name: 'Full Body Wellness',
        exercises: [
          {
            name: 'Sit-to-Stand',
            sets: '2',
            reps: '12',
            duration: null,
            equipment: [EQ.bench, EQ.chair],
            setting: ['gym', 'home'],
            patternTags: [TAGS.squat],
          },
          {
            name: 'Band Row',
            sets: '2',
            reps: '12',
            duration: null,
            equipment: [EQ.resistance_bands],
            setting: ['gym', 'home'],
            patternTags: [TAGS.pullHorizontal],
          },
          {
            name: 'Single-Leg Stance',
            sets: '3',
            reps: null,
            duration: '30 sec per leg',
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.balance],
          },
          {
            name: 'Cat-Camel',
            sets: '2',
            reps: '10',
            duration: null,
            equipment: [EQ.yoga_mats, EQ.none],
            setting: ['gym', 'home'],
            patternTags: [TAGS.mobilityTspine],
          },
          {
            name: 'Hip Flexor Stretch',
            sets: '2',
            reps: null,
            duration: '30 sec per leg',
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.mobilityHips],
          },
          {
            name: 'Calf Raises',
            sets: '2',
            reps: '15',
            duration: null,
            equipment: [EQ.none],
            setting: ['gym', 'home', 'outdoor'],
            patternTags: [TAGS.calves],
          },
        ],
      },
    },
  },
};

const buildSlot = (id, label, tags, alternates = [], options = {}) => ({
  id,
  label,
  tags,
  alternates,
  ...options,
});

const WORKOUT_TEMPLATES = {
  functional_strength: {
    full_body: {
      sessionStyle: 'strength',
      slots: [
        buildSlot('squat', 'Squat pattern', [TAGS.squat], [TAGS.lunge]),
        buildSlot('hinge', 'Hinge pattern', [TAGS.hinge]),
        buildSlot('push', 'Push (horizontal/vertical)', [TAGS.pushHorizontal, TAGS.pushVertical]),
        buildSlot('pull', 'Pull (horizontal/vertical)', [TAGS.pullHorizontal, TAGS.pullVertical]),
        buildSlot('carry_core', 'Carry or core', [TAGS.carry, TAGS.coreAntiExtension, TAGS.coreAntiRotation]),
      ],
      longSlots: [buildSlot('core', 'Core stability', [TAGS.coreAntiExtension, TAGS.coreLateral])],
    },
    upper_body: {
      sessionStyle: 'strength',
      slots: [
        buildSlot('push_h', 'Horizontal push', [TAGS.pushHorizontal]),
        buildSlot('pull_h', 'Horizontal pull', [TAGS.pullHorizontal]),
        buildSlot('push_v', 'Vertical push', [TAGS.pushVertical]),
        buildSlot('pull_v', 'Vertical pull', [TAGS.pullVertical]),
        buildSlot('core', 'Core stability', [TAGS.coreAntiExtension, TAGS.coreAntiRotation, TAGS.coreLateral]),
      ],
    },
    lower_body: {
      sessionStyle: 'strength',
      slots: [
        buildSlot('squat', 'Squat pattern', [TAGS.squat]),
        buildSlot('hinge', 'Hinge pattern', [TAGS.hinge]),
        buildSlot('unilateral', 'Unilateral (lunge)', [TAGS.lunge]),
        buildSlot('posterior', 'Glute/hamstring focus', [TAGS.gluteIsolation, TAGS.hamstringIsolation, TAGS.hinge]),
        buildSlot('core', 'Core stability', [TAGS.coreAntiExtension]),
      ],
    },
    push: {
      sessionStyle: 'strength',
      slots: [
        buildSlot('press_h', 'Horizontal press', [TAGS.pushHorizontal]),
        buildSlot('press_v', 'Vertical press', [TAGS.pushVertical]),
        buildSlot('triceps', 'Secondary press or triceps', [TAGS.triceps, TAGS.pushHorizontal]),
        buildSlot('scap', 'Scap stability', [TAGS.scapStability, TAGS.rearDelt]),
      ],
    },
    pull: {
      sessionStyle: 'strength',
      slots: [
        buildSlot('pull_v', 'Vertical pull', [TAGS.pullVertical]),
        buildSlot('pull_h', 'Horizontal pull', [TAGS.pullHorizontal]),
        buildSlot('rear_delt', 'Rear delt focus', [TAGS.rearDelt]),
        buildSlot('biceps', 'Biceps focus', [TAGS.biceps]),
        buildSlot('core', 'Core stability', [TAGS.coreAntiExtension, TAGS.coreLateral]),
      ],
    },
  },
  hypertrophy: {
    upper_body: {
      sessionStyle: 'hypertrophy',
      slots: [
        buildSlot('chest', 'Chest press', [TAGS.pushHorizontal, TAGS.chestIsolation]),
        buildSlot('row', 'Row pattern', [TAGS.pullHorizontal]),
        buildSlot('press', 'Secondary press', [TAGS.pushHorizontal]),
        buildSlot('pulldown', 'Vertical pull', [TAGS.pullVertical]),
        buildSlot('shoulders', 'Shoulders', [TAGS.shoulders, TAGS.pushVertical]),
        buildSlot('arms', 'Arms finisher', [TAGS.biceps, TAGS.triceps]),
      ],
    },
    lower_body: {
      sessionStyle: 'hypertrophy',
      slots: [
        buildSlot('squat', 'Squat/press', [TAGS.squat]),
        buildSlot('hinge', 'Hamstring/hinge', [TAGS.hamstringIsolation, TAGS.hinge]),
        buildSlot('unilateral', 'Unilateral', [TAGS.lunge]),
        buildSlot('quad', 'Quad isolation', [TAGS.quadIsolation]),
        buildSlot('glute', 'Glute isolation', [TAGS.gluteIsolation]),
        buildSlot('calves', 'Calves', [TAGS.calves]),
      ],
    },
    push: {
      sessionStyle: 'hypertrophy',
      slots: [
        buildSlot('chest', 'Chest focus', [TAGS.pushHorizontal, TAGS.chestIsolation]),
        buildSlot('incline', 'Secondary press', [TAGS.pushHorizontal]),
        buildSlot('shoulders', 'Shoulders', [TAGS.pushVertical, TAGS.shoulders]),
        buildSlot('triceps', 'Triceps', [TAGS.triceps]),
        buildSlot('finisher', 'Optional finisher', [TAGS.pushHorizontal, TAGS.chestIsolation]),
      ],
    },
    pull: {
      sessionStyle: 'hypertrophy',
      slots: [
        buildSlot('pulldown', 'Vertical pull', [TAGS.pullVertical]),
        buildSlot('row', 'Row pattern', [TAGS.pullHorizontal]),
        buildSlot('rear', 'Rear delts', [TAGS.rearDelt]),
        buildSlot('biceps', 'Biceps', [TAGS.biceps]),
        buildSlot('finisher', 'Optional finisher', [TAGS.pullHorizontal, TAGS.biceps]),
      ],
    },
    full_body: {
      sessionStyle: 'hypertrophy',
      slots: [
        buildSlot('legs', 'Lower body press', [TAGS.squat]),
        buildSlot('press', 'Press', [TAGS.pushHorizontal]),
        buildSlot('pull', 'Pull', [TAGS.pullHorizontal, TAGS.pullVertical]),
        buildSlot('hinge', 'Hinge or unilateral', [TAGS.hinge, TAGS.lunge]),
        buildSlot('arms_core', 'Arms or core', [TAGS.biceps, TAGS.coreAntiExtension]),
      ],
    },
  },
  fat_loss: {
    full_body: {
      sessionStyle: 'strength_circuit',
      slots: [
        buildSlot('lower1', 'Lower-body drive', [TAGS.squat, TAGS.lunge]),
        buildSlot('push', 'Upper push', [TAGS.pushHorizontal]),
        buildSlot('core', 'Core stability', [TAGS.coreAntiExtension]),
        buildSlot('power', 'Explosive burst', [TAGS.powerJump, TAGS.cardioCircuit]),
        buildSlot('hinge', 'Hinge pattern', [TAGS.hinge, TAGS.powerHinge]),
        buildSlot('lower2', 'Lower-body drive', [TAGS.lunge, TAGS.squat]),
        buildSlot('conditioning', 'Conditioning', [TAGS.cardioCircuit]),
        buildSlot('finisher', 'Finisher', [TAGS.cardioCircuit]),
      ],
    },
    cardio_intervals: {
      sessionStyle: 'intervals',
      slots: [buildSlot('intervals', 'Interval modality', [TAGS.cardioInterval])],
      longSlots: [buildSlot('finisher', 'Bodyweight finisher', [TAGS.cardioCircuit, TAGS.coreAntiExtension])],
    },
    upper_body: {
      sessionStyle: 'strength_circuit',
      slots: [
        buildSlot('push1', 'Push', [TAGS.pushHorizontal]),
        buildSlot('pull1', 'Pull', [TAGS.pullHorizontal]),
        buildSlot('push2', 'Push', [TAGS.pushVertical, TAGS.pushHorizontal]),
        buildSlot('pull2', 'Pull', [TAGS.pullHorizontal]),
        buildSlot('core', 'Core finisher', [TAGS.coreAntiExtension, TAGS.coreRotation]),
      ],
    },
    lower_body: {
      sessionStyle: 'strength_circuit',
      slots: [
        buildSlot('squat', 'Squat pattern', [TAGS.squat]),
        buildSlot('hinge', 'Hinge pattern', [TAGS.hinge]),
        buildSlot('lunge', 'Lunge pattern', [TAGS.lunge]),
        buildSlot('power', 'Power finisher', [TAGS.powerJump]),
        buildSlot('conditioning', 'Short finisher', [TAGS.cardioCircuit, TAGS.lunge]),
      ],
    },
  },
  cardiac_health: {
    steady_state: {
      sessionStyle: 'steady_state',
      slots: [buildSlot('steady', 'Steady-state modality', [TAGS.cardioSteady])],
    },
    intervals: {
      sessionStyle: 'intervals',
      slots: [buildSlot('intervals', 'Interval modality', [TAGS.cardioInterval])],
      longSlots: [buildSlot('finisher', 'Optional finisher', [TAGS.cardioCircuit])],
    },
    circuit: {
      sessionStyle: 'circuit',
      slots: [
        buildSlot('move1', 'Cardio move', [TAGS.cardioCircuit]),
        buildSlot('move2', 'Cardio move', [TAGS.cardioCircuit]),
        buildSlot('move3', 'Cardio move', [TAGS.cardioCircuit]),
        buildSlot('move4', 'Cardio move', [TAGS.cardioCircuit]),
        buildSlot('move5', 'Cardio move', [TAGS.cardioCircuit]),
        buildSlot('move6', 'Cardio move', [TAGS.cardioCircuit]),
      ],
    },
  },
  athleticism: {
    power: {
      sessionStyle: 'power',
      slots: [
        buildSlot('jump', 'Power jump/throw', [TAGS.powerJump, TAGS.powerThrow]),
        buildSlot('hinge', 'Explosive hinge', [TAGS.powerHinge]),
        buildSlot('lateral', 'Lateral power', [TAGS.lateral, TAGS.powerJump]),
        buildSlot('core', 'Core stability', [TAGS.coreAntiExtension, TAGS.coreLateral]),
      ],
    },
    speed: {
      sessionStyle: 'speed',
      slots: [
        buildSlot('sprint1', 'Sprint pattern', [TAGS.speed]),
        buildSlot('agility', 'Agility drill', [TAGS.agility]),
        buildSlot('sprint2', 'Sprint pattern', [TAGS.speed]),
        buildSlot('conditioning', 'Conditioning', [TAGS.cardioInterval]),
      ],
    },
    strength_for_power: {
      sessionStyle: 'strength',
      slots: [
        buildSlot('squat', 'Squat or hinge', [TAGS.squat, TAGS.hinge]),
        buildSlot('press', 'Press', [TAGS.pushHorizontal]),
        buildSlot('pull', 'Pull', [TAGS.pullHorizontal]),
        buildSlot('unilateral', 'Accessory unilateral', [TAGS.lunge]),
      ],
    },
    full_body: {
      sessionStyle: 'power',
      slots: [
        buildSlot('jump', 'Power jump', [TAGS.powerJump]),
        buildSlot('press', 'Strength press', [TAGS.pushHorizontal]),
        buildSlot('pull', 'Strength pull', [TAGS.pullHorizontal]),
        buildSlot('hinge', 'Explosive hinge', [TAGS.powerHinge]),
        buildSlot('jump2', 'Jump variant', [TAGS.powerJump, TAGS.lateral]),
      ],
    },
  },
  injury_prevention: {
    eccentric: {
      sessionStyle: 'prehab',
      slots: [
        buildSlot('hamstring', 'Hamstring eccentric', [TAGS.eccentricHamstring]),
        buildSlot('calf', 'Calf eccentric', [TAGS.eccentricCalf]),
        buildSlot('lunge', 'Split squat tempo', [TAGS.eccentricLunge]),
        buildSlot('push', 'Push eccentric', [TAGS.eccentricPush]),
        buildSlot('trunk', 'Trunk control', [TAGS.coreAntiExtension]),
      ],
    },
    isometrics: {
      sessionStyle: 'prehab',
      slots: [
        buildSlot('squat', 'Squat isometric', [TAGS.isometricSquat]),
        buildSlot('calf', 'Calf isometric', [TAGS.isometricCalf]),
        buildSlot('lunge', 'Split squat hold', [TAGS.isometricLunge]),
        buildSlot('lateral', 'Lateral chain', [TAGS.coreLateral]),
        buildSlot('trunk', 'Trunk control', [TAGS.coreAntiExtension]),
      ],
    },
    balance: {
      sessionStyle: 'prehab',
      slots: [
        buildSlot('stance', 'Single-leg stance', [TAGS.balance]),
        buildSlot('reach', 'Dynamic balance', [TAGS.balance]),
        buildSlot('hinge', 'Balance hinge', [TAGS.balance, TAGS.hinge]),
        buildSlot('walk', 'Gait balance', [TAGS.balance]),
        buildSlot('trunk', 'Trunk control', [TAGS.coreLateral, TAGS.coreAntiExtension]),
      ],
    },
    trunk_stability: {
      sessionStyle: 'prehab',
      slots: [
        buildSlot('anti_ext', 'Anti-extension', [TAGS.coreAntiExtension]),
        buildSlot('anti_rot', 'Anti-rotation', [TAGS.coreAntiRotation]),
        buildSlot('lateral', 'Lateral chain', [TAGS.coreLateral]),
        buildSlot('posterior', 'Posterior control', [TAGS.coreAntiExtension]),
      ],
    },
    full_body: {
      sessionStyle: 'prehab',
      slots: [
        buildSlot('hamstring', 'Hamstring control', [TAGS.eccentricHamstring]),
        buildSlot('balance', 'Balance drill', [TAGS.balance]),
        buildSlot('calf', 'Calf control', [TAGS.eccentricCalf]),
        buildSlot('core', 'Core control', [TAGS.coreAntiExtension]),
        buildSlot('hinge', 'Hinge control', [TAGS.hinge]),
      ],
    },
  },
  longevity: {
    strength_light: {
      sessionStyle: 'longevity',
      slots: [
        buildSlot('squat', 'Sit-to-stand', [TAGS.squat]),
        buildSlot('push', 'Push', [TAGS.pushHorizontal]),
        buildSlot('pull', 'Pull', [TAGS.pullHorizontal]),
        buildSlot('calves', 'Calf strength', [TAGS.calves]),
        buildSlot('balance', 'Balance', [TAGS.balance]),
      ],
    },
    balance: {
      sessionStyle: 'longevity',
      slots: [
        buildSlot('stance', 'Static stance', [TAGS.balance]),
        buildSlot('tandem', 'Tandem control', [TAGS.balance]),
        buildSlot('dynamic', 'Dynamic balance', [TAGS.balance]),
        buildSlot('lunge', 'Multi-direction', [TAGS.lunge, TAGS.balance]),
        buildSlot('reach', 'Reach patterns', [TAGS.balance]),
      ],
    },
    mobility: {
      sessionStyle: 'mobility',
      slots: [
        buildSlot('hips', 'Hip mobility', [TAGS.mobilityHips]),
        buildSlot('tspine', 'T-spine mobility', [TAGS.mobilityTspine]),
        buildSlot('hamstrings', 'Hamstring mobility', [TAGS.mobilityHamstrings]),
        buildSlot('ankles', 'Ankle mobility', [TAGS.mobilityAnkles]),
        buildSlot('flow', 'Flow sequence', [TAGS.mobilityFull]),
      ],
    },
    breathing: {
      sessionStyle: 'breathing',
      slots: [
        buildSlot('breath1', 'Breathing reset', [TAGS.breathing]),
        buildSlot('breath2', 'Low-intensity walk', [TAGS.breathing, TAGS.cardioSteady]),
        buildSlot('recovery', 'Recovery work', [TAGS.recovery]),
      ],
    },
    full_body: {
      sessionStyle: 'longevity',
      slots: [
        buildSlot('squat', 'Sit-to-stand', [TAGS.squat]),
        buildSlot('row', 'Upper pull', [TAGS.pullHorizontal]),
        buildSlot('balance', 'Balance', [TAGS.balance]),
        buildSlot('tspine', 'Spine mobility', [TAGS.mobilityTspine]),
        buildSlot('hips', 'Hip mobility', [TAGS.mobilityHips]),
        buildSlot('calves', 'Calf strength', [TAGS.calves]),
      ],
    },
  },
};

const TIME_OPTIONS = [10, 15, 20, 30, 45, 60, 75, 90];

const OUTDOOR_FORMATS = {
  cardiac_health: {
    intervals: [
      {
        title: 'Track interval session',
        equipmentHints: [EQ.track],
        details: (mainTime, interval) =>
          `${interval.rounds} rounds on the track: ${interval.work}s fast / ${interval.rest}s walk.`,
      },
      {
        title: 'Hill sprint session',
        equipmentHints: [EQ.hill],
        details: (mainTime, interval) =>
          `${interval.rounds} rounds: ${interval.work}s uphill / walk-back recovery.`,
      },
    ],
    steady_state: [
      {
        title: 'Park endurance session',
        equipmentHints: [],
        details: (mainTime) => `Smooth outdoor effort for ${mainTime} minutes.`,
      },
    ],
    circuit: [
      {
        title: 'Park cardio circuit',
        equipmentHints: [EQ.bench],
        details: (mainTime, circuit) =>
          `${circuit.rounds} rounds: ${circuit.work}s per move / ${circuit.rest}s rest.`,
      },
    ],
  },
  fat_loss: {
    full_body: [
      {
        title: 'Park strength circuit',
        equipmentHints: [EQ.bench],
        details: (mainTime, circuit) =>
          `${circuit.rounds} rounds with fast transitions and short rests.`,
      },
      {
        title: 'Bodyweight strength ladder',
        equipmentHints: [],
        details: () => 'Climb reps up and down each movement for density.',
      },
    ],
    cardio_intervals: [
      {
        title: 'Outdoor interval session',
        equipmentHints: [EQ.track],
        details: (mainTime, interval) =>
          `${interval.rounds} rounds: ${interval.work}s hard / ${interval.rest}s easy.`,
      },
    ],
  },
  athleticism: {
    speed: [
      {
        title: 'Speed/agility session',
        equipmentHints: [EQ.track],
        details: () => 'Full recovery between sprints; keep reps crisp.',
      },
    ],
    power: [
      {
        title: 'Plyo field session',
        equipmentHints: [],
        details: () => 'Explosive intent with full rest between sets.',
      },
    ],
  },
};

const TIME_TIERS = [
  { id: 'micro', max: 15, setDelta: -1 },
  { id: 'short', max: 30, setDelta: 0 },
  { id: 'standard', max: 60, setDelta: 0 },
  { id: 'long', max: 90, setDelta: 1 },
];

function getTimeTier(targetDuration) {
  return TIME_TIERS.find((tier) => targetDuration <= tier.max) || TIME_TIERS[TIME_TIERS.length - 1];
}

function getWarmupCooldown(targetDuration) {
  if (targetDuration <= 15) {
    return { warmup: 2, cooldown: targetDuration <= 10 ? 1 : 2 };
  }
  if (targetDuration <= 30) {
    return { warmup: targetDuration <= 20 ? 3 : 4, cooldown: 3 };
  }
  if (targetDuration <= 60) {
    return { warmup: 5, cooldown: 5 };
  }
  return { warmup: targetDuration <= 75 ? 6 : 8, cooldown: targetDuration <= 75 ? 6 : 8 };
}

function adjustSetString(sets, delta) {
  if (!sets || typeof sets !== 'string') return sets;
  const match = sets.trim().match(/^(\d+)(?:\s*-\s*(\d+))?$/);
  if (!match) return sets;
  const min = Math.max(1, parseInt(match[1], 10) + delta);
  const max = Math.max(min, match[2] ? parseInt(match[2], 10) + delta : min);
  return match[2] ? `${min}-${max}` : `${min}`;
}

function shuffleArray(list) {
  return [...list].sort(() => Math.random() - 0.5);
}

function formatEquipmentLabel(key) {
  return EQUIPMENT_CATALOG[key]?.label || key;
}

function getEquipmentSummary(equipmentKeys) {
  if (!equipmentKeys || equipmentKeys.length === 0) return 'Bodyweight';
  return equipmentKeys.map(formatEquipmentLabel).join(', ');
}

function matchesTags(exercise, tags) {
  return tags.some((tag) => exercise.patternTags.includes(tag));
}

function filterBySetting(exercises, setting) {
  return exercises.filter((exercise) => exercise.setting.includes(setting));
}

function filterBySettingAndEquipment(exercises, setting, availableEquipment) {
  return exercises.filter((exercise) => {
    if (!exercise.setting.includes(setting)) return false;
    if (exercise.equipment.includes(EQ.none)) return true;
    return exercise.equipment.some((eq) => availableEquipment.includes(eq));
  });
}

function getCandidatesForSlot(slot, exercises, setting, availableEquipment, usedNames) {
  const inSetting = filterBySetting(exercises, setting);
  const withEquipment = filterBySettingAndEquipment(exercises, setting, availableEquipment);

  const attemptGroups = [
    withEquipment.filter((exercise) => matchesTags(exercise, slot.tags)),
    withEquipment.filter((exercise) => matchesTags(exercise, slot.alternates || [])),
    inSetting.filter(
      (exercise) => exercise.equipment.includes(EQ.none) && matchesTags(exercise, slot.tags),
    ),
    inSetting.filter(
      (exercise) => exercise.equipment.includes(EQ.none) && matchesTags(exercise, slot.alternates || []),
    ),
    inSetting.filter((exercise) => matchesTags(exercise, slot.tags)),
    inSetting.filter((exercise) => matchesTags(exercise, slot.alternates || [])),
  ];

  let candidates = attemptGroups.find((group) => group.length > 0) || [];

  if (!slot.allowRepeat) {
    const filtered = candidates.filter((exercise) => !usedNames.has(exercise.name));
    if (filtered.length > 0) {
      candidates = filtered;
    }
  }

  return shuffleArray(candidates);
}

function buildSlotPlan(template, timeTier) {
  if (!template) return [];
  let slots = template.slots || [];
  if (timeTier.id === 'micro') {
    slots = slots.slice(0, Math.min(3, slots.length));
  } else if (timeTier.id === 'short') {
    slots = slots.slice(0, Math.min(5, slots.length));
  } else if (timeTier.id === 'long') {
    slots = template.longSlots ? slots.concat(template.longSlots) : slots;
  }
  return slots;
}

function buildIntervalPrescription(mainTime) {
  const totalSeconds = Math.max(mainTime * 60, 240);
  let work = 20;
  let rest = 40;
  if (mainTime > 20) {
    work = 40;
    rest = 80;
  } else if (mainTime > 12) {
    work = 30;
    rest = 60;
  }
  const rounds = Math.max(4, Math.floor(totalSeconds / (work + rest)));
  return { rounds, work, rest };
}

function buildCircuitPrescription(mainTime, timeTier) {
  const work = timeTier.id === 'micro' ? 20 : timeTier.id === 'short' ? 30 : 40;
  const rest = timeTier.id === 'micro' ? 20 : timeTier.id === 'short' ? 20 : 30;
  const roundMinutes = Math.max(3, Math.floor((work + rest) / 60));
  const rounds = Math.max(2, Math.floor(mainTime / roundMinutes));
  return { rounds, work, rest };
}

function selectExercisesFromTemplate(slotPlan, subgroupExercises, setting, availableEquipment) {
  const selected = [];
  const usedNames = new Set();

  slotPlan.forEach((slot) => {
    const candidates = getCandidatesForSlot(slot, subgroupExercises, setting, availableEquipment, usedNames);
    if (!candidates.length) return;
    const exercise = candidates[0];
    if (!slot.allowRepeat) {
      usedNames.add(exercise.name);
    }
    selected.push({
      ...exercise,
      slotLabel: slot.label,
      slotId: slot.id,
    });
  });

  return selected;
}

function buildSessionFormat({ categoryKey, subgroupKey, sessionStyle, setting, mainTime, timeTier }) {
  if (!sessionStyle) return null;
  const interval = buildIntervalPrescription(mainTime);
  const circuit = buildCircuitPrescription(mainTime, timeTier);
  const outdoorOptions = OUTDOOR_FORMATS?.[categoryKey]?.[subgroupKey] || [];
  const outdoorChoice = setting === 'outdoor' && outdoorOptions.length
    ? outdoorOptions[Math.floor(Math.random() * outdoorOptions.length)]
    : null;

  if (sessionStyle === 'steady_state') {
    return {
      title: outdoorChoice?.title || 'Steady-state block',
      details: outdoorChoice?.details(mainTime, interval) || `Smooth pace for ${mainTime} minutes.`,
      equipmentHints: outdoorChoice?.equipmentHints || [],
      overrideDuration: `${mainTime} min`,
    };
  }
  if (sessionStyle === 'intervals') {
    return {
      title: outdoorChoice?.title || 'Interval block',
      details:
        outdoorChoice?.details(mainTime, interval) ||
        `${interval.rounds} rounds: ${interval.work}s hard / ${interval.rest}s easy.`,
      equipmentHints: outdoorChoice?.equipmentHints || [],
      overrideDuration: `${interval.rounds} rounds · ${interval.work}s / ${interval.rest}s`,
    };
  }
  if (sessionStyle === 'circuit' || sessionStyle === 'strength_circuit') {
    return {
      title: outdoorChoice?.title || (sessionStyle === 'circuit' ? 'Cardio circuit' : 'Metabolic circuit'),
      details:
        outdoorChoice?.details(mainTime, circuit) ||
        `${circuit.rounds} rounds: ${circuit.work}s work / ${circuit.rest}s rest.`,
      equipmentHints: outdoorChoice?.equipmentHints || [],
    };
  }
  if (sessionStyle === 'power') {
    return {
      title: outdoorChoice?.title || 'Power session',
      details: outdoorChoice?.details(mainTime, interval) || 'Explosive intent, full recovery between sets.',
      equipmentHints: outdoorChoice?.equipmentHints || [],
    };
  }
  if (sessionStyle === 'speed') {
    return {
      title: outdoorChoice?.title || 'Speed + agility session',
      details: outdoorChoice?.details(mainTime, interval) || 'Full recovery between sprints; keep reps crisp.',
      equipmentHints: outdoorChoice?.equipmentHints || [],
    };
  }
  if (sessionStyle === 'breathing') {
    return {
      title: 'Breathing reset',
      details: 'Keep the session low-intensity and recovery focused.',
      equipmentHints: [],
    };
  }
  return null;
}

function generateWorkout({ categoryKey, subgroupKey, setting, availableEquipment, targetDuration }) {
  const categoryData = EXERCISE_DATABASE[categoryKey];
  if (!categoryData) return null;
  const subgroupData = categoryData.subgroups[subgroupKey];
  if (!subgroupData) return null;

  const timeTier = getTimeTier(targetDuration);
  const { warmup, cooldown } = getWarmupCooldown(targetDuration);
  const mainTime = Math.max(targetDuration - warmup - cooldown, 6);
  const template = WORKOUT_TEMPLATES[categoryKey]?.[subgroupKey];
  const slotPlan = buildSlotPlan(template, timeTier);

  const selectedExercises = selectExercisesFromTemplate(
    slotPlan,
    subgroupData.exercises,
    setting,
    availableEquipment,
  );

  if (!selectedExercises.length) return null;

  const sessionFormat = buildSessionFormat({
    categoryKey,
    subgroupKey,
    sessionStyle: template?.sessionStyle,
    setting,
    mainTime,
    timeTier,
  });

  const scaledExercises = selectedExercises.map((exercise) => ({
    ...exercise,
    sets: adjustSetString(exercise.sets, timeTier.setDelta),
  }));

  if (sessionFormat?.overrideDuration && scaledExercises.length) {
    scaledExercises[0] = { ...scaledExercises[0], duration: sessionFormat.overrideDuration };
  }

  const equipmentUsed = Array.from(
    new Set(
      [
        ...scaledExercises.flatMap((exercise) => exercise.equipment),
        ...(sessionFormat?.equipmentHints || []),
      ].filter((item) => item !== EQ.none),
    ),
  );

  return {
    category: categoryData.name,
    categoryIcon: categoryData.icon,
    subgroup: subgroupData.name,
    setting,
    exercises: scaledExercises,
    estimatedDuration: mainTime,
    warmupTime: warmup,
    cooldownTime: cooldown,
    totalTime: warmup + mainTime + cooldown,
    equipmentUsed,
    sessionFormat,
    timeTier: timeTier.id,
  };
}

function getAvailableFocusAreas(categoryKey, setting, availableEquipment) {
  const category = EXERCISE_DATABASE[categoryKey];
  if (!category || !setting) return [];
  const availableSubgroups = [];
  for (const [key, subgroup] of Object.entries(category.subgroups)) {
    const exercisesForSetting = filterBySettingAndEquipment(subgroup.exercises, setting, availableEquipment);
    if (exercisesForSetting.length >= 2) {
      availableSubgroups.push({ id: key, name: subgroup.name, exerciseCount: exercisesForSetting.length });
    }
  }
  return availableSubgroups;
}

function shouldSkipFocusArea(categoryKey, setting, availableEquipment) {
  const availableFocusAreas = getAvailableFocusAreas(categoryKey, setting, availableEquipment);
  if (availableFocusAreas.length === 1) return { skip: true, autoSelect: availableFocusAreas[0].id };
  if (setting === 'outdoor' && categoryKey === 'cardiac_health') {
    const intervals = availableFocusAreas.find((focus) => focus.id === 'intervals' || focus.id === 'steady_state');
    if (intervals && availableFocusAreas.length <= 2) return { skip: true, autoSelect: intervals.id };
  }
  return { skip: false, autoSelect: null };
}

export default function FitFlowApp() {
  const [step, setStep] = useState('time');
  const [selectedSetting, setSelectedSetting] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFocusArea, setSelectedFocusArea] = useState(null);
  const [targetDuration, setTargetDuration] = useState(null);
  const [userGym, setUserGym] = useState('planet_fitness');
  const [customGymEquipment, setCustomGymEquipment] = useState(GYM_EQUIPMENT_PROFILES.planet_fitness);
  const [homeExtras, setHomeExtras] = useState([]);
  const [outdoorExtras, setOutdoorExtras] = useState([]);
  const [workout, setWorkout] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  const categories = useMemo(
    () =>
      Object.entries(EXERCISE_DATABASE).map(([key, value]) => ({
        id: key,
        name: value.name,
        description: value.description,
        icon: value.icon,
      })),
    [],
  );

  const settings = [
    { id: 'gym', name: 'Gym', icon: '🏋️', description: 'Full equipment access' },
    { id: 'home', name: 'Home', icon: '🏠', description: 'Minimal equipment' },
    { id: 'outdoor', name: 'Outdoor', icon: '🌳', description: 'Parks, fields, outdoors' },
  ];

  const progressSteps = ['time', 'setting', 'category', 'focus_area'];
  const activeIndex = progressSteps.indexOf(step);

  const getGymEquipment = () => {
    if (userGym === 'other') return customGymEquipment;
    return GYM_EQUIPMENT_PROFILES[userGym] || GYM_EQUIPMENT_PROFILES.planet_fitness;
  };

  const getSettingEquipment = (setting) => {
    if (setting === 'gym') return getGymEquipment();
    if (setting === 'home') return [...SETTING_EQUIPMENT_DEFAULTS.home, ...homeExtras];
    if (setting === 'outdoor') return [...SETTING_EQUIPMENT_DEFAULTS.outdoor, ...outdoorExtras];
    return [];
  };

  const settingEquipment = selectedSetting ? getSettingEquipment(selectedSetting) : [];

  const handleSettingSelect = (settingId) => {
    setSelectedSetting(settingId);
    setSelectedCategory(null);
    setSelectedFocusArea(null);
    setWorkout(null);
    setStep('category');
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedFocusArea(null);
    setWorkout(null);
    const skipCheck = shouldSkipFocusArea(categoryId, selectedSetting, settingEquipment);
    if (skipCheck.skip) {
      setSelectedFocusArea(skipCheck.autoSelect);
      if (targetDuration) {
        const generatedWorkout = generateWorkout({
          categoryKey: categoryId,
          subgroupKey: skipCheck.autoSelect,
          setting: selectedSetting,
          availableEquipment: settingEquipment,
          targetDuration,
        });
        setWorkout(generatedWorkout);
        setStep('workout');
      } else {
        setStep('time');
      }
    } else {
      setStep('focus_area');
    }
  };

  const handleFocusAreaSelect = (focusAreaId) => {
    setSelectedFocusArea(focusAreaId);
    setWorkout(null);
    if (targetDuration) {
      const generatedWorkout = generateWorkout({
        categoryKey: selectedCategory,
        subgroupKey: focusAreaId,
        setting: selectedSetting,
        availableEquipment: settingEquipment,
        targetDuration,
      });
      setWorkout(generatedWorkout);
      setStep('workout');
    } else {
      setStep('time');
    }
  };

  const handleTimeSelect = (minutes) => {
    setTargetDuration(minutes);
    if (selectedSetting && selectedCategory && selectedFocusArea) {
      const generatedWorkout = generateWorkout({
        categoryKey: selectedCategory,
        subgroupKey: selectedFocusArea,
        setting: selectedSetting,
        availableEquipment: settingEquipment,
        targetDuration: minutes,
      });
      setWorkout(generatedWorkout);
      setStep('workout');
      return;
    }
    setWorkout(null);
    setStep('setting');
  };

  const handleRegenerate = () => {
    if (!selectedCategory || !selectedFocusArea || !targetDuration) return;
    const generatedWorkout = generateWorkout({
      categoryKey: selectedCategory,
      subgroupKey: selectedFocusArea,
      setting: selectedSetting,
      availableEquipment: settingEquipment,
      targetDuration,
    });
    setWorkout(generatedWorkout);
  };

  const handleReset = () => {
    setStep('time');
    setSelectedSetting(null);
    setSelectedCategory(null);
    setSelectedFocusArea(null);
    setTargetDuration(null);
    setWorkout(null);
  };

  const handleBack = () => {
    if (step === 'setting') {
      setStep('time');
      return;
    }
    if (step === 'category') {
      setStep('setting');
      setSelectedCategory(null);
      setSelectedFocusArea(null);
      setWorkout(null);
      return;
    }
    if (step === 'focus_area') {
      setStep('category');
      setSelectedFocusArea(null);
      setWorkout(null);
      return;
    }
    if (step === 'workout') {
      const skipCheck = shouldSkipFocusArea(selectedCategory, selectedSetting, settingEquipment);
      if (skipCheck.skip) {
        setStep('category');
        setSelectedCategory(null);
        setSelectedFocusArea(null);
      } else {
        setStep('focus_area');
        setSelectedFocusArea(null);
      }
      setWorkout(null);
    }
  };

  const getFilteredCategories = () => {
    if (!selectedSetting) return categories;
    return categories.filter(
      (cat) => getAvailableFocusAreas(cat.id, selectedSetting, settingEquipment).length > 0,
    );
  };

  const equipmentSummary = workout ? getEquipmentSummary(workout.equipmentUsed) : '';

  const toggleListItem = (current, value, setter) => {
    if (current.includes(value)) {
      setter(current.filter((item) => item !== value));
    } else {
      setter([...current, value]);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
        fontFamily: "'Outfit', 'Segoe UI', sans-serif",
        color: '#fff',
        padding: '0',
        margin: '0',
        overflow: 'auto',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        .card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
        }
        .card:hover {
          transform: translateY(-4px);
          border-color: rgba(99, 102, 241, 0.5);
          background: rgba(99, 102, 241, 0.1);
          box-shadow: 0 20px 40px rgba(99, 102, 241, 0.15);
        }
        .card.active {
          border-color: rgba(99, 102, 241, 0.8);
          background: rgba(99, 102, 241, 0.12);
        }
        .setting-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 32px 24px;
        }
        .setting-card .icon { font-size: 48px; margin-bottom: 16px; }
        .time-card { text-align: center; padding: 24px; }
        .time-value { font-size: 28px; font-weight: 700; margin-bottom: 6px; }
        .time-label { font-size: 12px; color: rgba(255,255,255,0.45); letter-spacing: 1px; text-transform: uppercase; }
        .exercise-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 16px 20px;
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }
        .slot-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.3px;
          color: rgba(255,255,255,0.4);
          margin-bottom: 4px;
        }
        .btn {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border: none;
          color: white;
          padding: 14px 28px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 15px;
          font-family: inherit;
        }
        .btn:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4); }
        .btn-outline { background: transparent; border: 1px solid rgba(255,255,255,0.2); }
        .btn-outline:hover { background: rgba(255,255,255,0.05); }
        .tag {
          background: rgba(99, 102, 241, 0.2);
          color: #a5b4fc;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
          display: inline-block;
        }
        .progress-bar { display: flex; gap: 8px; margin-bottom: 32px; }
        .progress-step { flex: 1; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; }
        .progress-step.active { background: linear-gradient(90deg, #6366f1, #8b5cf6); }
        .settings-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .settings-content {
          background: #1a1a2e;
          border-radius: 20px;
          padding: 32px;
          width: 90%;
          max-width: 480px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .settings-group {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .checklist {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
        }
        .checklist label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: rgba(255,255,255,0.8);
        }
        .back-btn {
          background: none;
          border: none;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          margin-bottom: 16px;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0;
          font-family: inherit;
        }
        .step-label {
          display: inline-block;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: rgba(255,255,255,0.4);
          margin-bottom: 8px;
        }
        .equipment-summary {
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          margin-top: 8px;
        }
        .session-format {
          background: rgba(99, 102, 241, 0.08);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 12px;
          padding: 14px 16px;
          margin-bottom: 16px;
        }
        .session-format-title { font-weight: 600; margin-bottom: 6px; }
        .session-format-detail { font-size: 13px; color: rgba(255,255,255,0.7); }
      `}</style>
      <header
        style={{
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          onClick={handleReset}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
            }}
          >
            ⚡
          </div>
          <span style={{ fontWeight: 700, fontSize: '20px', letterSpacing: '-0.5px' }}>FitFlow</span>
        </div>
        <button
          onClick={() => setShowSettings(true)}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px',
            padding: '10px 16px',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
          }}
        >
          ⚙️ Settings
        </button>
      </header>
      <main style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
        {step !== 'workout' && (
          <div className="progress-bar">
            {progressSteps.map((_, index) => (
              <div key={index} className={`progress-step ${index <= activeIndex ? 'active' : ''}`} />
            ))}
          </div>
        )}
        {step === 'setting' && (
          <div>
            <span className="step-label">Step 2 of 4</span>
            <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', marginTop: '4px' }}>
              Where are you training?
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '28px', fontSize: '15px' }}>
              This helps us show only exercises you can actually do.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {settings.map((setting) => (
                <div
                  key={setting.id}
                  className="card setting-card"
                  onClick={() => handleSettingSelect(setting.id)}
                >
                  <div className="icon">{setting.icon}</div>
                  <h3 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '4px', color: '#fff' }}>
                    {setting.name}
                  </h3>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                    {setting.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 'category' && (
          <div>
            <button className="back-btn" onClick={handleBack}>
              ← Back
            </button>
            <span className="step-label">Step 3 of 4</span>
            <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', marginTop: '4px' }}>
              What's your goal today?
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '28px', fontSize: '15px' }}>
              Training at{' '}
              <span style={{ color: '#a5b4fc', fontWeight: 500 }}>
                {settings.find((s) => s.id === selectedSetting)?.name}
              </span>
            </p>
            <div style={{ display: 'grid', gap: '12px' }}>
              {getFilteredCategories().map((cat) => (
                <div
                  key={cat.id}
                  className="card"
                  onClick={() => handleCategorySelect(cat.id)}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}
                >
                  <div
                    style={{
                      fontSize: '28px',
                      width: '44px',
                      height: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(99, 102, 241, 0.15)',
                      borderRadius: '10px',
                      flexShrink: 0,
                    }}
                  >
                    {cat.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '4px', color: '#fff' }}>
                      {cat.name}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                      {cat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 'focus_area' && (
          <div>
            <button className="back-btn" onClick={handleBack}>
              ← Back
            </button>
            <span className="step-label">Step 4 of 4</span>
            <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', marginTop: '4px' }}>
              Which area are you focusing on?
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '28px', fontSize: '15px' }}>
              <span style={{ color: '#a5b4fc', fontWeight: 500 }}>
                {EXERCISE_DATABASE[selectedCategory]?.icon} {EXERCISE_DATABASE[selectedCategory]?.name}
              </span>{' '}
              at{' '}
              <span style={{ color: '#a5b4fc', fontWeight: 500 }}>
                {settings.find((s) => s.id === selectedSetting)?.name}
              </span>
            </p>
            <div style={{ display: 'grid', gap: '12px' }}>
              {getAvailableFocusAreas(selectedCategory, selectedSetting, settingEquipment).map((focus) => (
                <div
                  key={focus.id}
                  className="card"
                  onClick={() => handleFocusAreaSelect(focus.id)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#fff', margin: 0 }}>
                    {focus.name}
                  </h3>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                    {focus.exerciseCount} exercises
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 'time' && (
          <div>
            <span className="step-label">Step 1 of 4</span>
            <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', marginTop: '4px' }}>
              How much time do you have?
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '28px', fontSize: '15px' }}>
              We will scale volume and structure to fit your time window.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              {TIME_OPTIONS.map((minutes) => (
                <div
                  key={minutes}
                  className={`card time-card ${targetDuration === minutes ? 'active' : ''}`}
                  onClick={() => handleTimeSelect(minutes)}
                >
                  <div className="time-value">{minutes}</div>
                  <div className="time-label">minutes</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 'workout' && workout && (
          <div>
            <button className="back-btn" onClick={handleBack}>
              ← Back
            </button>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                <span className="tag">
                  {settings.find((s) => s.id === selectedSetting)?.icon}{' '}
                  {settings.find((s) => s.id === selectedSetting)?.name}
                </span>
                <span className="tag">
                  {workout.categoryIcon} {workout.category}
                </span>
                <span className="tag">{workout.subgroup}</span>
                <span className="tag">{targetDuration} min</span>
              </div>
              <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>Your Workout</h1>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>
                ~{workout.totalTime} min total
              </p>
              <div className="equipment-summary">Equipment: {equipmentSummary}</div>
            </div>
            {workout.sessionFormat && (
              <div className="session-format">
                <div className="session-format-title">{workout.sessionFormat.title}</div>
                <div className="session-format-detail">{workout.sessionFormat.details}</div>
              </div>
            )}
            <div
              style={{
                background: 'rgba(251, 191, 36, 0.1)',
                border: '1px solid rgba(251, 191, 36, 0.2)',
                borderRadius: '12px',
                padding: '16px 20px',
                marginBottom: '16px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '20px' }}>🔥</span>
                  <span style={{ fontWeight: 600, color: '#fbbf24' }}>Warm-up</span>
                </div>
                <span style={{ color: 'rgba(251, 191, 36, 0.8)', fontSize: '14px' }}>
                  {workout.warmupTime} min
                </span>
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              {workout.exercises.map((exercise, idx) => (
                <div key={`${exercise.name}-${idx}`} className="exercise-card">
                  <div>
                    <div className="slot-label">{exercise.slotLabel}</div>
                    <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>
                      {exercise.name}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                      {exercise.equipment.filter((item) => item !== EQ.none).map(formatEquipmentLabel).join(', ') ||
                        'Bodyweight'}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    {exercise.sets && (
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', color: '#a5b4fc' }}>
                        {exercise.sets} sets
                      </div>
                    )}
                    {exercise.reps && (
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', color: '#a5b4fc' }}>
                        {exercise.reps}
                      </div>
                    )}
                    {exercise.duration && (
                      <div
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: '13px',
                          color: 'rgba(255,255,255,0.5)',
                        }}
                      >
                        {exercise.duration}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                background: 'rgba(96, 165, 250, 0.1)',
                border: '1px solid rgba(96, 165, 250, 0.2)',
                borderRadius: '12px',
                padding: '16px 20px',
                marginBottom: '24px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '20px' }}>❄️</span>
                  <span style={{ fontWeight: 600, color: '#60a5fa' }}>Cool-down & Stretch</span>
                </div>
                <span style={{ color: 'rgba(96, 165, 250, 0.8)', fontSize: '14px' }}>
                  {workout.cooldownTime} min
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn" onClick={handleRegenerate} style={{ flex: 1 }}>
                🔄 Regenerate
              </button>
              <button className="btn btn-outline" onClick={handleReset} style={{ flex: 1 }}>
                ← New Workout
              </button>
            </div>
          </div>
        )}
      </main>
      {showSettings && (
        <div className="settings-modal" onClick={() => setShowSettings(false)}>
          <div className="settings-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Settings</h2>
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '14px',
                }}
              >
                Your Gym
              </label>
              <select
                value={userGym}
                onChange={(event) => setUserGym(event.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '15px',
                }}
              >
                <option value="planet_fitness">Planet Fitness</option>
                <option value="la_fitness">LA Fitness</option>
                <option value="24_hour">24 Hour Fitness</option>
                <option value="anytime">Anytime Fitness</option>
                <option value="ymca">YMCA</option>
                <option value="other">Other Gym</option>
              </select>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '8px' }}>
                Equipment availability will be optimized based on typical equipment at your gym.
              </p>
            </div>
            {userGym === 'other' && (
              <div className="settings-group">
                <h3 style={{ fontSize: '15px', marginTop: 0 }}>Select available equipment</h3>
                <div className="checklist">
                  {OTHER_GYM_EQUIPMENT_OPTIONS.map((equipmentKey) => (
                    <label key={equipmentKey}>
                      <input
                        type="checkbox"
                        checked={customGymEquipment.includes(equipmentKey)}
                        onChange={() =>
                          toggleListItem(customGymEquipment, equipmentKey, setCustomGymEquipment)
                        }
                      />
                      {formatEquipmentLabel(equipmentKey)}
                    </label>
                  ))}
                </div>
              </div>
            )}
            <div className="settings-group">
              <h3 style={{ fontSize: '15px', marginTop: 0 }}>Home extras</h3>
              <div className="checklist">
                {HOME_OPTIONAL_EQUIPMENT.map((equipmentKey) => (
                  <label key={equipmentKey}>
                    <input
                      type="checkbox"
                      checked={homeExtras.includes(equipmentKey)}
                      onChange={() => toggleListItem(homeExtras, equipmentKey, setHomeExtras)}
                    />
                    {formatEquipmentLabel(equipmentKey)}
                  </label>
                ))}
              </div>
            </div>
            <div className="settings-group">
              <h3 style={{ fontSize: '15px', marginTop: 0 }}>Outdoor extras</h3>
              <div className="checklist">
                {OUTDOOR_OPTIONAL_EQUIPMENT.map((equipmentKey) => (
                  <label key={equipmentKey}>
                    <input
                      type="checkbox"
                      checked={outdoorExtras.includes(equipmentKey)}
                      onChange={() => toggleListItem(outdoorExtras, equipmentKey, setOutdoorExtras)}
                    />
                    {formatEquipmentLabel(equipmentKey)}
                  </label>
                ))}
              </div>
            </div>
            <button className="btn" onClick={() => setShowSettings(false)} style={{ width: '100%', marginTop: '24px' }}>
              Save Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
