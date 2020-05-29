(function () {
  'use strict';

  // Based on https://github.com/screepers/RoomVisual

  // Original colors
  // const colors = {
  //   gray: '#555555',
  //   light: '#AAAAAA',
  //   road: '#666',
  //   energy: '#FFE87B',
  //   power: '#F53547',
  //   dark: '#181818',
  //   outline: '#8FBB93',
  //   speechText: '#000000',
  //   speechBackground: '#2ccf3b'
  // }

  const colors = {
    gray: '#664444',
    light: '#AAAAAA',
    road: '#966',
    energy: '#FFE87B',
    power: '#F53547',
    dark: '#381818',
    outline: '#AFBB93',
    speechText: '#000000',
    speechBackground: '#2ccf3b'
  };

  const speechSize = 0.5;
  const speechFont = 'Times New Roman';
  function calculateFactoryLevelGapsPoly() {
    let x = -0.08;
    let y = -0.52;
    let result = [];

    let gapAngle = 16 * (Math.PI / 180);
    let c1 = Math.cos(gapAngle);
    let s1 = Math.sin(gapAngle);

    let angle = 72 * (Math.PI / 180);
    let c2 = Math.cos(angle);
    let s2 = Math.sin(angle);

    for (let i = 0; i < 5; ++i) {
      result.push([0.0, 0.0]);
      result.push([x, y]);
      result.push([x * c1 - y * s1, x * s1 + y * c1]);
      let tmpX = x * c2 - y * s2;
      y = x * s2 + y * c2;
      x = tmpX;
    }
    return result;
  }
  const factoryLevelGaps = calculateFactoryLevelGapsPoly();

  RoomVisual.prototype.structure = function (x, y, type, opts = {}) {
    opts = Object.assign({
      opacity: 1
    }, opts);
    switch (type) {
      case STRUCTURE_FACTORY: {
        const outline = [
          [-0.68, -0.11],
          [-0.84, -0.18],
          [-0.84, -0.32],
          [-0.44, -0.44],
          [-0.32, -0.84],
          [-0.18, -0.84],
          [-0.11, -0.68],

          [0.11, -0.68],
          [0.18, -0.84],
          [0.32, -0.84],
          [0.44, -0.44],
          [0.84, -0.32],
          [0.84, -0.18],
          [0.68, -0.11],

          [0.68, 0.11],
          [0.84, 0.18],
          [0.84, 0.32],
          [0.44, 0.44],
          [0.32, 0.84],
          [0.18, 0.84],
          [0.11, 0.68],

          [-0.11, 0.68],
          [-0.18, 0.84],
          [-0.32, 0.84],
          [-0.44, 0.44],
          [-0.84, 0.32],
          [-0.84, 0.18],
          [-0.68, 0.11]
        ];
        this.poly(outline.map(p => [p[0] + x, p[1] + y]), {
          fill: null,
          stroke: colors.outline,
          strokeWidth: 0.05,
          opacity: opts.opacity
        });
        // outer circle
        this.circle(x, y, {
          radius: 0.65,
          fill: '#232323',
          strokeWidth: 0.035,
          stroke: '#140a0a',
          opacity: opts.opacity
        });
        const spikes = [
          [-0.4, -0.1],
          [-0.8, -0.2],
          [-0.8, -0.3],
          [-0.4, -0.4],
          [-0.3, -0.8],
          [-0.2, -0.8],
          [-0.1, -0.4],

          [0.1, -0.4],
          [0.2, -0.8],
          [0.3, -0.8],
          [0.4, -0.4],
          [0.8, -0.3],
          [0.8, -0.2],
          [0.4, -0.1],

          [0.4, 0.1],
          [0.8, 0.2],
          [0.8, 0.3],
          [0.4, 0.4],
          [0.3, 0.8],
          [0.2, 0.8],
          [0.1, 0.4],

          [-0.1, 0.4],
          [-0.2, 0.8],
          [-0.3, 0.8],
          [-0.4, 0.4],
          [-0.8, 0.3],
          [-0.8, 0.2],
          [-0.4, 0.1]
        ];
        this.poly(spikes.map(p => [p[0] + x, p[1] + y]), {
          fill: colors.gray,
          stroke: '#140a0a',
          strokeWidth: 0.04,
          opacity: opts.opacity
        });
        // factory level circle
        this.circle(x, y, {
          radius: 0.54,
          fill: '#302a2a',
          strokeWidth: 0.04,
          stroke: '#140a0a',
          opacity: opts.opacity
        });
        this.poly(factoryLevelGaps.map(p => [p[0] + x, p[1] + y]), {
          fill: '#140a0a',
          stroke: null,
          opacity: opts.opacity
        });
        // inner black circle
        this.circle(x, y, {
          radius: 0.42,
          fill: '#140a0a',
          opacity: opts.opacity
        });
        this.rect(x - 0.24, y - 0.24, 0.48, 0.48, {
          fill: '#3f3f3f',
          opacity: opts.opacity
        });
        break;
      }
      case STRUCTURE_EXTENSION:
        this.circle(x, y, {
          radius: 0.5,
          fill: colors.dark,
          stroke: colors.outline,
          strokeWidth: 0.05,
          opacity: opts.opacity
        });
        this.circle(x, y, {
          radius: 0.35,
          fill: colors.gray,
          opacity: opts.opacity
        });
        break
      case STRUCTURE_SPAWN:
        this.circle(x, y, {
          radius: 0.65,
          fill: colors.dark,
          stroke: '#CCCCCC',
          strokeWidth: 0.10,
          opacity: opts.opacity
        });
        this.circle(x, y, {
          radius: 0.40,
          fill: colors.energy,
          opacity: opts.opacity
        });

        break;
      case STRUCTURE_POWER_SPAWN:
        this.circle(x, y, {
          radius: 0.65,
          fill: colors.dark,
          stroke: colors.power,
          strokeWidth: 0.10,
          opacity: opts.opacity
        });
        this.circle(x, y, {
          radius: 0.40,
          fill: colors.energy,
          opacity: opts.opacity
        });
        break;
      case STRUCTURE_LINK:
        {
          let outer = [
            [0.0, -0.5],
            [0.4, 0.0],
            [0.0, 0.5],
            [-0.4, 0.0]
          ];
          let inner = [
            [0.0, -0.3],
            [0.25, 0.0],
            [0.0, 0.3],
            [-0.25, 0.0]
          ];
          outer = relPoly(x, y, outer);
          inner = relPoly(x, y, inner);
          outer.push(outer[0]);
          inner.push(inner[0]);
          this.poly(outer, {
            fill: colors.dark,
            stroke: colors.outline,
            strokeWidth: 0.05,
            opacity: opts.opacity
          });
          this.poly(inner, {
            fill: colors.gray,
            stroke: false,
            opacity: opts.opacity
          });
          break;
        }
      case STRUCTURE_TERMINAL:
        {
          let outer = [
            [0.0, -0.8],
            [0.55, -0.55],
            [0.8, 0.0],
            [0.55, 0.55],
            [0.0, 0.8],
            [-0.55, 0.55],
            [-0.8, 0.0],
            [-0.55, -0.55],
          ];
          let inner = [
            [0.0, -0.65],
            [0.45, -0.45],
            [0.65, 0.0],
            [0.45, 0.45],
            [0.0, 0.65],
            [-0.45, 0.45],
            [-0.65, 0.0],
            [-0.45, -0.45],
          ];
          outer = relPoly(x, y, outer);
          inner = relPoly(x, y, inner);
          outer.push(outer[0]);
          inner.push(inner[0]);
          this.poly(outer, {
            fill: colors.dark,
            stroke: colors.outline,
            strokeWidth: 0.05,
            opacity: opts.opacity
          });
          this.poly(inner, {
            fill: colors.light,
            stroke: false,
            opacity: opts.opacity
          });
          this.rect(x - 0.45, y - 0.45, 0.9, 0.9, {
            fill: colors.gray,
            stroke: colors.dark,
            strokeWidth: 0.1,
            opacity: opts.opacity
          });
          break;
        }
      case STRUCTURE_LAB:
        this.circle(x, y - 0.025, {
          radius: 0.55,
          fill: colors.dark,
          stroke: colors.outline,
          strokeWidth: 0.05,
          opacity: opts.opacity
        });
        this.circle(x, y - 0.025, {
          radius: 0.40,
          fill: colors.gray,
          opacity: opts.opacity
        });
        this.rect(x - 0.45, y + 0.3, 0.9, 0.25, {
          fill: colors.dark,
          stroke: false,
          opacity: opts.opacity
        });
        {
          let box = [
            [-0.45, 0.3],
            [-0.45, 0.55],
            [0.45, 0.55],
            [0.45, 0.3],
          ];
          box = relPoly(x, y, box);
          this.poly(box, {
            stroke: colors.outline,
            strokeWidth: 0.05,
            opacity: opts.opacity
          });
        }
        break
      case STRUCTURE_TOWER:
        this.circle(x, y, {
          radius: 0.6,
          fill: colors.dark,
          stroke: colors.outline,
          strokeWidth: 0.05,
          opacity: opts.opacity
        });
        this.rect(x - 0.4, y - 0.3, 0.8, 0.6, {
          fill: colors.gray,
          opacity: opts.opacity
        });
        this.rect(x - 0.2, y - 0.9, 0.4, 0.5, {
          fill: colors.light,
          stroke: colors.dark,
          strokeWidth: 0.07,
          opacity: opts.opacity
        });
        break;
      case STRUCTURE_ROAD:
        this.circle(x, y, {
          radius: 0.175,
          fill: colors.road,
          stroke: false,
          opacity: opts.opacity
        });
        if (!this.roads) this.roads = [];
        this.roads.push([x, y]);
        break;
      case STRUCTURE_RAMPART:
        this.circle(x, y, {
          radius: 0.65,
          fill: '#434C43',
          stroke: '#5D735F',
          strokeWidth: 0.10,
          opacity: opts.opacity
        });
        break;
      case STRUCTURE_WALL:
        let points = [
          [x - 0.45, y - 0.3],
          [x - 0.3, y - 0.45],
          [x + 0.3, y - 0.45],
          [x + 0.45, y - 0.3],
          [x + 0.45, y + 0.3],
          [x + 0.3, y + 0.45],
          [x - 0.3, y + 0.45],
          [x - 0.45, y + 0.3]
        ];
        this.poly(points, {
          fill: colors.dark,
          stroke: null,
          opacity: opts.opacity
        });
        break;
      case STRUCTURE_STORAGE:
        let outline1 = relPoly(x, y, [
          [-0.45, -0.55],
          [0, -0.65],
          [0.45, -0.55],
          [0.55, 0],
          [0.45, 0.55],
          [0, 0.65],
          [-0.45, 0.55],
          [-0.55, 0],
          [-0.45, -0.55],
        ]);
        this.poly(outline1, {
          stroke: colors.outline,
          strokeWidth: 0.05,
          fill: colors.dark,
          opacity: opts.opacity
        });
        this.rect(x - 0.35, y - 0.45, 0.7, 0.9, {
          fill: colors.energy,
          opacity: opts.opacity,
        });
        break;
      case STRUCTURE_OBSERVER:
        this.circle(x, y, {
          fill: colors.dark,
          radius: 0.45,
          stroke: colors.outline,
          strokeWidth: 0.05,
          opacity: opts.opacity
        });
        this.circle(x + 0.225, y, {
          fill: colors.outline,
          radius: 0.20,
          opacity: opts.opacity
        });
        break;
      case STRUCTURE_NUKER:
        let outline = [
          [0, -1],
          [-0.47, 0.2],
          [-0.5, 0.5],
          [0.5, 0.5],
          [0.47, 0.2],
          [0, -1],
        ];
        outline = relPoly(x, y, outline);
        this.poly(outline, {
          stroke: colors.outline,
          strokeWidth: 0.05,
          fill: colors.dark,
          opacity: opts.opacity
        });
        let inline = [
          [0, -.80],
          [-0.40, 0.2],
          [0.40, 0.2],
          [0, -.80],
        ];
        inline = relPoly(x, y, inline);
        this.poly(inline, {
          stroke: colors.outline,
          strokeWidth: 0.01,
          fill: colors.gray,
          opacity: opts.opacity
        });
        break;
      case STRUCTURE_CONTAINER:
        this.rect(x - 0.225, y - 0.3, 0.45, 0.6, {
          fill: colors.gray,
          opacity: opts.opacity,
          stroke: colors.dark,
          strokeWidth: 0.09,
        });
        this.rect(x - 0.17, y + 0.07, 0.34, 0.2, {
          fill: colors.energy,
          opacity: opts.opacity,
        });
        break;
      default:
        this.circle(x, y, {
          fill: colors.light,
          radius: 0.35,
          stroke: colors.dark,
          strokeWidth: 0.20,
          opacity: opts.opacity
        });
        break;
    }

    return this;
  };

  const dirs = [
    [],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1]
  ];

  RoomVisual.prototype.connectRoads = function (opts = {}) {
    let color = opts.color || colors.road || 'white';
    if (!this.roads) return
    this.roads.forEach(r => {
      for (let i = 1; i <= 4; i++) {
        let d = dirs[i];
        let c = [r[0] + d[0], r[1] + d[1]];
        let rd = _.some(this.roads, r => r[0] == c[0] && r[1] == c[1]);
        if (rd) {
          this.line(r[0], r[1], c[0], c[1], {
            color: color,
            width: 0.35,
            opacity: opts.opacity || 1
          });
        }
      }
    });

    return this;
  };


  RoomVisual.prototype.speech = function (text, x, y, opts = {}) {
    var background = !!opts.background ? opts.background : colors.speechBackground;
    var textcolor = !!opts.textcolor ? opts.textcolor : colors.speechText;
    var textstyle = !!opts.textstyle ? opts.textstyle : false;
    var textsize = !!opts.textsize ? opts.textsize : speechSize;
    var textfont = !!opts.textfont ? opts.textfont : speechFont;
    var opacity = !!opts.opacity ? opts.opacity : 1;

    var fontstring = '';
    if (textstyle) {
      fontstring = textstyle + ' ';
    }
    fontstring += textsize + ' ' + textfont;

    let pointer = [
      [-0.2, -0.8],
      [0.2, -0.8],
      [0, -0.3]
    ];
    pointer = relPoly(x, y, pointer);
    pointer.push(pointer[0]);

    this.poly(pointer, {
      fill: background,
      stroke: background,
      opacity: opacity,
      strokeWidth: 0.0
    });

    this.text(text, x, y - 1, {
      color: textcolor,
      backgroundColor: background,
      backgroundPadding: 0.1,
      opacity: opacity,
      font: fontstring
    });

    return this;
  };


  RoomVisual.prototype.animatedPosition = function (x, y, opts = {}) {

    let color = !!opts.color ? opts.color : 'blue';
    let opacity = !!opts.opacity ? opts.opacity : 0.5;
    let radius = !!opts.radius ? opts.radius : 0.75;
    let frames = !!opts.frames ? opts.frames : 6;


    let angle = (Game.time % frames * 90 / frames) * (Math.PI / 180);
    let s = Math.sin(angle);
    let c = Math.cos(angle);

    let sizeMod = Math.abs(Game.time % frames - frames / 2) / 10;
    radius += radius * sizeMod;

    let points = [
      rotate(0, -radius, s, c, x, y),
      rotate(radius, 0, s, c, x, y),
      rotate(0, radius, s, c, x, y),
      rotate(-radius, 0, s, c, x, y),
      rotate(0, -radius, s, c, x, y),
    ];

    this.poly(points, { stroke: color, opacity: opacity });

    return this;
  };

  function rotate(x, y, s, c, px, py) {
    let xDelta = x * c - y * s;
    let yDelta = x * s + y * c;
    return { x: px + xDelta, y: py + yDelta };
  }


  function relPoly(x, y, poly) {
    return poly.map(p => {
      p[0] += x;
      p[1] += y;
      return p
    })
  }

  RoomVisual.prototype.test = function test() {
    let demopos = [19, 24];
    this.clear();
    this.structure(demopos[0] + 0, demopos[1] + 0, STRUCTURE_LAB);
    this.structure(demopos[0] + 1, demopos[1] + 1, STRUCTURE_TOWER);
    this.structure(demopos[0] + 2, demopos[1] + 0, STRUCTURE_LINK);
    this.structure(demopos[0] + 3, demopos[1] + 1, STRUCTURE_TERMINAL);
    this.structure(demopos[0] + 4, demopos[1] + 0, STRUCTURE_EXTENSION);
    this.structure(demopos[0] + 5, demopos[1] + 1, STRUCTURE_SPAWN);

    return this;
  };


  /// #region RESOURCE BADGES
  const ColorSets = {
    white: ["#ffffff", "#4c4c4c"],
    grey: ["#b4b4b4", "#4c4c4c"],
    red: ["#ff7b7b", "#592121"],
    yellow: ["#fdd388", "#5d4c2e"],
    green: ["#00f4a2", "#236144"],
    blue: ["#50d7f9", "#006181"],
    purple: ["#a071ff", "#371383"],
  };
  const ResourceColors = {
    [RESOURCE_ENERGY]: ColorSets.yellow,
    [RESOURCE_POWER]: ColorSets.red,

    [RESOURCE_HYDROGEN]: ColorSets.grey,
    [RESOURCE_OXYGEN]: ColorSets.grey,
    [RESOURCE_UTRIUM]: ColorSets.blue,
    [RESOURCE_LEMERGIUM]: ColorSets.green,
    [RESOURCE_KEANIUM]: ColorSets.purple,
    [RESOURCE_ZYNTHIUM]: ColorSets.yellow,
    [RESOURCE_CATALYST]: ColorSets.red,
    [RESOURCE_GHODIUM]: ColorSets.white,

    [RESOURCE_HYDROXIDE]: ColorSets.grey,
    [RESOURCE_ZYNTHIUM_KEANITE]: ColorSets.grey,
    [RESOURCE_UTRIUM_LEMERGITE]: ColorSets.grey,

    [RESOURCE_UTRIUM_HYDRIDE]: ColorSets.blue,
    [RESOURCE_UTRIUM_OXIDE]: ColorSets.blue,
    [RESOURCE_KEANIUM_HYDRIDE]: ColorSets.purple,
    [RESOURCE_KEANIUM_OXIDE]: ColorSets.purple,
    [RESOURCE_LEMERGIUM_HYDRIDE]: ColorSets.green,
    [RESOURCE_LEMERGIUM_OXIDE]: ColorSets.green,
    [RESOURCE_ZYNTHIUM_HYDRIDE]: ColorSets.yellow,
    [RESOURCE_ZYNTHIUM_OXIDE]: ColorSets.yellow,
    [RESOURCE_GHODIUM_HYDRIDE]: ColorSets.white,
    [RESOURCE_GHODIUM_OXIDE]: ColorSets.white,

    [RESOURCE_UTRIUM_ACID]: ColorSets.blue,
    [RESOURCE_UTRIUM_ALKALIDE]: ColorSets.blue,
    [RESOURCE_KEANIUM_ACID]: ColorSets.purple,
    [RESOURCE_KEANIUM_ALKALIDE]: ColorSets.purple,
    [RESOURCE_LEMERGIUM_ACID]: ColorSets.green,
    [RESOURCE_LEMERGIUM_ALKALIDE]: ColorSets.green,
    [RESOURCE_ZYNTHIUM_ACID]: ColorSets.yellow,
    [RESOURCE_ZYNTHIUM_ALKALIDE]: ColorSets.yellow,
    [RESOURCE_GHODIUM_ACID]: ColorSets.white,
    [RESOURCE_GHODIUM_ALKALIDE]: ColorSets.white,

    [RESOURCE_CATALYZED_UTRIUM_ACID]: ColorSets.blue,
    [RESOURCE_CATALYZED_UTRIUM_ALKALIDE]: ColorSets.blue,
    [RESOURCE_CATALYZED_KEANIUM_ACID]: ColorSets.purple,
    [RESOURCE_CATALYZED_KEANIUM_ALKALIDE]: ColorSets.purple,
    [RESOURCE_CATALYZED_LEMERGIUM_ACID]: ColorSets.green,
    [RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE]: ColorSets.green,
    [RESOURCE_CATALYZED_ZYNTHIUM_ACID]: ColorSets.yellow,
    [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE]: ColorSets.yellow,
    [RESOURCE_CATALYZED_GHODIUM_ACID]: ColorSets.white,
    [RESOURCE_CATALYZED_GHODIUM_ALKALIDE]: ColorSets.white,
  };

  const MINERALS = [
    RESOURCE_CATALYST,
    RESOURCE_HYDROGEN,
    RESOURCE_OXYGEN,
    RESOURCE_LEMERGIUM,
    RESOURCE_UTRIUM,
    RESOURCE_ZYNTHIUM,
    RESOURCE_KEANIUM
  ];

  RoomVisual.prototype.resource = function (type, x, y, size = 0.25) {
    if (type == RESOURCE_ENERGY || type == RESOURCE_POWER)
      this._fluid(type, x, y, size);
    else if (MINERALS.includes(type))
      this._mineral(type, x, y, size);
    else if (ResourceColors[type] != undefined)
      this._compound(type, x, y, size);
    else
      return ERR_INVALID_ARGS
    return OK;
  };
  RoomVisual.prototype._fluid = function (type, x, y, size = 0.25) {
    this.circle(x, y, {
      radius: size,
      fill: ResourceColors[type][0],
      opacity: 1,
    });
    this.text(type[0], x, y - (size * 0.1), {
      font: (size * 1.5),
      color: ResourceColors[type][1],
      backgroundColor: ResourceColors[type][0],
      backgroundPadding: 0,
    });
  };
  RoomVisual.prototype._mineral = function (type, x, y, size = 0.25) {
    this.circle(x, y, {
      radius: size,
      fill: ResourceColors[type][0],
      opacity: 1,
    });
    this.circle(x, y, {
      radius: size * 0.8,
      fill: ResourceColors[type][1],
      opacity: 1,
    });
    this.text(type, x, y + (size * 0.03), {
      font: "bold " + (size * 1.25) + " arial",
      color: ResourceColors[type][0],
      backgroundColor: ResourceColors[type][1],
      backgroundPadding: 0,
    });
  };
  RoomVisual.prototype._compound = function (type, x, y, size = 0.25) {
    let label = type.replace("2", '₂');

    this.text(label, x, y, {
      font: "bold " + (size * 1) + " arial",
      color: ResourceColors[type][1],
      backgroundColor: ResourceColors[type][0],
      backgroundPadding: 0.3 * size,
    });
  };
    /// #endregion

  const isFull = c => c.store[RESOURCE_ENERGY] === c.store.getCapacity(RESOURCE_ENERGY);
  const isNotFull = c => c.store[RESOURCE_ENERGY] !== c.store.getCapacity(RESOURCE_ENERGY);
  const isEmpty = c => c.store.getFreeCapacity(RESOURCE_ENERGY) === c.store.getCapacity(RESOURCE_ENERGY);

  /**
   * @example 
   * const result = find_harvester_parts(40, 550, true)
   * 
   * @param {number} distance Distance between storage/spawn and energy node
   * @param {number} max_production_cost Maximum available energy to create a creep
   * @param {boolean} use_road Creeps will stay on roads
   */
  function findHarvesterParts(distance, max_production_cost, use_road = false) {
      const lifetime = CREEP_LIFE_TIME;
      const ticks_travelling = distance * 2;

      let best_energy_ratio = 0;
      let best_parts = null;

      for (let parts_work = 1; parts_work < 25; parts_work++) {
          for (let parts_carry = 1; parts_carry < 25; parts_carry++) {
              const parts_move = (use_road)
                  ? Math.ceil((parts_work + parts_carry) / 2)
                  : parts_work + parts_carry;
              
              if (parts_work + parts_carry + parts_move > 50) {
                  break
              }

              const production_cost = parts_work * 100 + parts_carry * 50 + parts_move * 50;
              
              if (production_cost > max_production_cost) {
                  break
              }

              const carry_capacity = parts_carry * 50;
              const ticks_refilling = carry_capacity / 2 / parts_work;
              const total_gathered = (lifetime / (ticks_travelling + ticks_refilling)) * carry_capacity;
              const energy_ratio = total_gathered / production_cost;

              if (energy_ratio > best_energy_ratio) {
                  best_energy_ratio = energy_ratio;
                  best_parts = {
                      work: parts_work,
                      carry: parts_carry,
                      move: parts_move
                  };
              }
          }
      }

      const final_parts = [
          Array(best_parts.work).fill(WORK),
          Array(best_parts.carry).fill(CARRY),
          Array(best_parts.move).fill(MOVE),
      ].flat();

      return {
          ratio: best_energy_ratio,
          parts: final_parts,
          roads: use_road
      }
  }

  function randomInt(min, max) {
      return Math.round(Math.random() * (max-min) + min)
  }

  const SINGLE_VOWEL_FREQUENCY = 40;
  const CONSONANT_VOWEL_FREQUENCY = 3;
  const TWO_CONSONANT_VOWEL_FREQUENCY = 1;

  var nameGenerator = {
      generate(prefix = null, suffix = null) {
          let name = "";

          const vowels = 'aeiouy'.split('');
          const consonants = 'bcdfghjklmnpqrstvwxz'.split('');
          const second_consonants = 'hlr';

          let syllables = [];

          // single vowels
          for (let i = 0; i < SINGLE_VOWEL_FREQUENCY; i++) {
              syllables = syllables.concat(vowels);
          }

          // consonant-vowel
          for (const consonant of consonants) {
              for (const vowel of vowels) {
                  for (let i = 0; i < CONSONANT_VOWEL_FREQUENCY; i++) {
                      syllables.push(consonant + vowel);
                      syllables.push(consonant + vowel);
                  }
              }
          }

          // consonant-consonant-vowel
          for (const consonant of consonants) {
              for (const consonant2 of second_consonants) {
                  for (const vowel of vowels) {
                      for (let i = 0; i < TWO_CONSONANT_VOWEL_FREQUENCY; i++) {
                          syllables.push(consonant + consonant2 + vowel);
                      }
                  }
              }
          }

          const n_syllables = randomInt(2, 3);

          for (let i = 0; i < n_syllables; i++) {
              name += syllables[Math.floor(Math.random() * syllables.length)];
          }

          const capitalized_name = name.charAt(0).toUpperCase() + name.slice(1);

          return (prefix || "") + capitalized_name + (suffix || "")
      }
  };

  const TASK = {
      REFILL: "refill",
      SPEND: "spend",
  };

  var multitask = {
      run(room_name, n_creeps) {
          const room = Game.rooms[room_name];
          const creeps = Object.values(Game.creeps).filter(c => c.memory.role === "multitask");
          
          if (creeps.length < n_creeps) {
              spawn(room, creeps, n_creeps);
          }
          
          for (const c of creeps) {
              if (isEmpty(c) && c.memory.task !== TASK.REFILL) {
                  c.memory.task = TASK.REFILL;
                  c.memory.task_target = room.find(FIND_SOURCES_ACTIVE).sort((a,b) => {
                      return 0.5 - Math.random()
                  })[0].id;
              }

              const need_new_target = c.memory.task_target === null || Game.getObjectById(c.memory.task_target) === null;

              if (isFull(c) || need_new_target) {
                  defineSpendTarget(room, c);
              }

              // TODO && target wtf
              if (c.memory.task === TASK.SPEND) {
                  doSpendTarget(room, c);

              } else if (c.memory.task === TASK.REFILL) {
                  doRefillTarget(room, c);
              }
          }
      },

  };

  function spawn(room, creeps, n_creeps) {
      const parts = (creeps.length > n_creeps - 2)
              ? findHarvesterParts(27, room.energyCapacityAvailable, false).parts
              : findHarvesterParts(27, Math.max(300, room.energyAvailable), false).parts;
      const name = nameGenerator.generate(null, "   ✦");
      const options = {
          memory: {
              role: "multitask",
              task: TASK.REFILL,
              task_target: null,
          }
      };
      Object.values(Game.spawns)[0].spawnCreep(parts, name, options);
  }

  function defineSpendTarget(room, c) {
      c.memory.task = TASK.SPEND;

      if (room.controller.ticksToDowngrade < 750) {
          c.memory.task_target = c.room.controller.id;
          
      } else {
          const spawn = Object.values(Game.spawns)[0];
          
          const sites = room.find(FIND_CONSTRUCTION_SITES).sort((a, b) => {
              (a.progress / a.progressTotal) - (b.progress / b.progressTotal);
          });
          
          const towers = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER }})
              .filter(tower => !isFull(tower));
          
          const extensions = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_EXTENSION }})
              .filter(extension => isNotFull(extension));

          if (! isFull(spawn)) {
              c.memory.task_target = spawn.id;
          } else if (towers.length) {
              c.memory.task_target = c.pos.findClosestByRange(towers).id;
          } else if (extensions.length) {
              c.memory.task_target = extensions[0].id;//c.pos.findClosestByPath(extensions).id
          } else if (sites.length) {
              c.memory.task_target = sites[0].id;
          } else {
              c.memory.task_target = c.room.controller.id; 
          }
      }
  }

  function doSpendTarget(room, c) {
      const target = Game.getObjectById(c.memory.task_target);

      c.moveTo(target);
                  
      // controller
      if (target.structureType === STRUCTURE_CONTROLLER) {
          c.upgradeController(target);

      // Construction site
      } else if (target.progress !== undefined) {
          c.build(target);

      // Refillable structure
      } else if ([STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_TOWER].includes(target.structureType)) {
          c.transfer(target, RESOURCE_ENERGY);
          if (isFull(target)) {
              c.memory.task_target = null;
          }
      }
  }

  function doRefillTarget(room, c) {
      const target = Game.getObjectById(c.memory.task_target);

      c.moveTo(target);
      c.harvest(target);
  }

  var defense = {
      run(room_name) {
          const room = Game.rooms[room_name];

          const towers = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER }});
          const damaged_creeps = room.find(FIND_MY_CREEPS).filter(c => c.hits < c.hitsMax);
          const ennemies = room.find(FIND_HOSTILE_CREEPS);

          for (const tower of towers) {
              if (ennemies.length) {
                  tower.attack(ennemies[0]);
              } else if (damaged_creeps.length) {
                  tower.heal(damaged_creeps[0]);
              }
          }
      }
  };

  // {"name":"textExport","shard":"shard0","rcl":"8","buildings":{"constructedWall":{"pos":[{"x":8,"y":10},{"x":9,"y":10},{"x":10,"y":10},{"x":11,"y":10},{"x":21,"y":10},{"x":22,"y":10},{"x":23,"y":10},{"x":24,"y":10},{"x":8,"y":11},{"x":11,"y":11},{"x":18,"y":11},{"x":21,"y":11},{"x":24,"y":11},{"x":8,"y":12},{"x":11,"y":12},{"x":12,"y":12},{"x":13,"y":12},{"x":14,"y":12},{"x":15,"y":12},{"x":16,"y":12},{"x":17,"y":12},{"x":18,"y":12},{"x":21,"y":12},{"x":24,"y":12},{"x":8,"y":13},{"x":9,"y":13},{"x":22,"y":13},{"x":23,"y":13},{"x":24,"y":13},{"x":9,"y":14},{"x":22,"y":14},{"x":9,"y":15},{"x":22,"y":15},{"x":9,"y":16},{"x":22,"y":16},{"x":9,"y":17},{"x":22,"y":17},{"x":9,"y":18},{"x":22,"y":18},{"x":9,"y":19},{"x":22,"y":19},{"x":9,"y":20},{"x":22,"y":20},{"x":9,"y":21},{"x":22,"y":21},{"x":9,"y":22},{"x":22,"y":22},{"x":9,"y":23},{"x":22,"y":23},{"x":8,"y":24},{"x":9,"y":24},{"x":22,"y":24},{"x":23,"y":24},{"x":24,"y":24},{"x":8,"y":25},{"x":11,"y":25},{"x":12,"y":25},{"x":13,"y":25},{"x":14,"y":25},{"x":15,"y":25},{"x":16,"y":25},{"x":17,"y":25},{"x":18,"y":25},{"x":21,"y":25},{"x":24,"y":25},{"x":8,"y":26},{"x":11,"y":26},{"x":18,"y":26},{"x":21,"y":26},{"x":24,"y":26},{"x":8,"y":27},{"x":9,"y":27},{"x":10,"y":27},{"x":11,"y":27},{"x":21,"y":27},{"x":22,"y":27},{"x":23,"y":27},{"x":24,"y":27}]},"tower":{"pos":[{"x":9,"y":11},{"x":22,"y":11},{"x":23,"y":12}]},"container":{"pos":[{"x":23,"y":11},{"x":9,"y":12}]},"extension":{"pos":[{"x":11,"y":13},{"x":12,"y":13},{"x":13,"y":13},{"x":14,"y":13},{"x":15,"y":13},{"x":16,"y":13},{"x":17,"y":13},{"x":10,"y":14},{"x":10,"y":15},{"x":12,"y":15},{"x":13,"y":15},{"x":14,"y":15},{"x":15,"y":15},{"x":16,"y":15},{"x":17,"y":15},{"x":10,"y":16},{"x":12,"y":16},{"x":13,"y":16},{"x":14,"y":16},{"x":15,"y":16},{"x":16,"y":16},{"x":17,"y":16},{"x":10,"y":17},{"x":10,"y":18},{"x":11,"y":18},{"x":12,"y":18},{"x":13,"y":18},{"x":14,"y":18},{"x":15,"y":18},{"x":16,"y":18},{"x":10,"y":19},{"x":11,"y":19},{"x":12,"y":19},{"x":13,"y":19},{"x":14,"y":19},{"x":15,"y":19},{"x":16,"y":19},{"x":10,"y":20},{"x":10,"y":21},{"x":12,"y":21},{"x":13,"y":21},{"x":14,"y":21},{"x":15,"y":21},{"x":16,"y":21},{"x":17,"y":21},{"x":10,"y":22},{"x":12,"y":22},{"x":13,"y":22},{"x":14,"y":22},{"x":15,"y":22},{"x":16,"y":22},{"x":17,"y":22},{"x":10,"y":23},{"x":11,"y":24},{"x":12,"y":24},{"x":13,"y":24},{"x":14,"y":24},{"x":15,"y":24},{"x":16,"y":24},{"x":17,"y":24}]},"spawn":{"pos":[{"x":21,"y":14},{"x":21,"y":16},{"x":21,"y":23}]},"storage":{"pos":[{"x":21,"y":18}]},"link":{"pos":[{"x":21,"y":19}]},"powerSpawn":{"pos":[{"x":21,"y":21}]}}}

  const layout = `
■ ■ ■ ■                   ■ ■ ■ ■
■ T3. ■             ■ ↓ ↑ ■ T1C1■
■ C3. ■ ■ ■ ■ ■ ■ ■ ■ ↓ ↑ ■ . T5■
■ ■ . ● ● ● ● ● ● ● . ↓ ↑ . ■ ■ ■
  ■ ● ↓ ← ← ← ← ← ← . ↓ ↑ S1■
  ■ ● ↓ ● ● ● ● ● ● . ↓ ↑ . ■
  ■ ● ↓ ● ● ● ● ● ● . ↓ ↑ S2■
  ■ ● → → → → → → → . ↓ ↑ . ■
  ■ ● ● ● ● ● ● ● ● . ↓ ↑ B ■
  ■ ● ● ● ● ● ● ● ● . ↓ ↑ L1■
  ■ ● ↓ ← ← ← ← ← ← . ↓ ↑ . ■
  ■ ● ↓ ● ● ● ● ● ● . ↓ ↑ PS■
  ■ ● ↓ ● ● ● ● ● ● . ↓ ↑ . ■
  ■ ● → → → → → → → . ↓ ↑ S3■
■ ■ . ● ● ● ● ● ● ● . ↓ ↑ . ■ ■ ■
■ C4. ■ ■ ■ ■ ■ ■ ■ ■ ↓ ↑ ■ . T2■
■ T4. ■             ■ ↓ ↑ ■ T6C2■
■ ■ ■ ■                   ■ ■ ■ ■
`;
  var architect = {

      createConstructionSites(room_name, corner, visualizeOnly = false) {
          const visual = new RoomVisual(room_name);
          const buildings = this.getLayoutBuildings();

          for (const b of buildings) {
              const x = corner.x + b.x;
              const y = corner.y + b.y;

              if (visualizeOnly) {
                  visual.structure(x, y, b.type, { opacity: 0.2 });
              } else {
                  Game.rooms[room_name].createConstructionSite(x, y, b.type);
              }

          }
      },

      visualizeConstructionSites(room_name, corner) {
          this.createConstructionSites(room_name, corner, true);
      },

      clearConstructionSites(room_name) {
          const sites = Game.rooms[room_name].find(FIND_CONSTRUCTION_SITES);

          for (const site of sites) { 
              site.remove();
          }
      },

      getLayoutBuildings() {
          const lines = layout.split("\n").slice(1,-1);
          
          const lines_with_buildings = lines.map((line, y) => {
              return line.match(/.{1,2}/g)
                  .map(str => str.trim())
                  .map((str, x) => this.getBuildingBySymbol(str, x, y))
                  .filter(building => building !== null)
          });
          
          const buildings = lines_with_buildings.flat()
              .sort((a, b) => a.priority - b.priority);

          return buildings
      },

      getBuildingBySymbol(str, x, y) {
          let building = null;

          switch (str) {
              case '■': building = { type: STRUCTURE_WALL, priority: x + y * 100 }; break

              case '●': building = { type: STRUCTURE_EXTENSION, priority: x + y * 100 }; break

              // case 'C1': building = { type: STRUCTURE_CONTAINER, priority: 1 }; break
              // case 'C2': building = { type: STRUCTURE_CONTAINER, priority: 2 }; break
              // case 'C3': building = { type: STRUCTURE_CONTAINER, priority: 3 }; break
              // case 'C4': building = { type: STRUCTURE_CONTAINER, priority: 4 }; break
              // case 'C5': building = { type: STRUCTURE_CONTAINER, priority: 5 }; break

              case 'T1': building = { type: STRUCTURE_TOWER, priority: 1 }; break
              case 'T2': building = { type: STRUCTURE_TOWER, priority: 2 }; break
              case 'T3': building = { type: STRUCTURE_TOWER, priority: 3 }; break
              case 'T4': building = { type: STRUCTURE_TOWER, priority: 4 }; break
              case 'T5': building = { type: STRUCTURE_TOWER, priority: 5 }; break
              case 'T6': building = { type: STRUCTURE_TOWER, priority: 6 }; break

              case 'S1': building = { type: STRUCTURE_SPAWN, priority: 1 }; break
              case 'S2': building = { type: STRUCTURE_SPAWN, priority: 2 }; break
              case 'S3': building = { type: STRUCTURE_SPAWN, priority: 3 }; break

              case 'PS': building = { type: STRUCTURE_POWER_SPAWN, priority: 1 }; break

              case 'B': building = { type: STRUCTURE_POWER_BANK, priority: 1 }; break

              case 'L1': building = { type: STRUCTURE_LINK, priority: 1 }; break
              case 'L2': building = { type: STRUCTURE_LINK, priority: 2 }; break
              case 'L3': building = { type: STRUCTURE_LINK, priority: 3 }; break
              case 'L4': building = { type: STRUCTURE_LINK, priority: 4 }; break
              case 'L5': building = { type: STRUCTURE_LINK, priority: 5 }; break
              case 'L6': building = { type: STRUCTURE_LINK, priority: 6 }; break

              // case '.': building = { type: STRUCTURE_ROAD, priority: 1 }; break
              // case '↑': building = { type: STRUCTURE_ROAD, priority: 1 }; break
              // case '→': building = { type: STRUCTURE_ROAD, priority: 1 }; break
              // case '↓': building = { type: STRUCTURE_ROAD, priority: 1 }; break
              // case '←': building = { type: STRUCTURE_ROAD, priority: 1 }; break

              default: building = null;
          }

          if (building !== null) {
              building.x = x;
              building.y = y;
          }

          return building
      }
  };

  // import './roles/standby'

  const ROOM = 'W3N7';

  multitask.run(ROOM, 8);
  defense.run(ROOM);

  // architect.clearConstructionSites(ROOM)
  // architect.visualizeConstructionSites(ROOM, { x: 27, y: 9 })
  architect.createConstructionSites(ROOM, { x: 27, y: 9 });

}());
