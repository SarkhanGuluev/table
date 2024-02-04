export const LEVELS_KEYS = {
  level1: "level1",
  level2: "level2",
  level3: "level3",
  level4: "level4",
  level5: "level5",
};

export const previousLevelKeyByCurrent = {
  [LEVELS_KEYS.level1]: null,
  [LEVELS_KEYS.level2]: LEVELS_KEYS.level1,
  [LEVELS_KEYS.level3]: LEVELS_KEYS.level2,
  [LEVELS_KEYS.level4]: LEVELS_KEYS.level3,
  [LEVELS_KEYS.level5]: LEVELS_KEYS.level4,
};

export const nextLevelKeyByCurrent = {
  [LEVELS_KEYS.level1]: LEVELS_KEYS.level2,
  [LEVELS_KEYS.level2]: LEVELS_KEYS.level3,
  [LEVELS_KEYS.level3]: LEVELS_KEYS.level4,
  [LEVELS_KEYS.level4]: LEVELS_KEYS.level5,
  [LEVELS_KEYS.level5]: null,
};

export const nextLevelsByCurrent = {
  [LEVELS_KEYS.level1]: [
    LEVELS_KEYS.level2,
    LEVELS_KEYS.level3,
    LEVELS_KEYS.level4,
    LEVELS_KEYS.level5,
  ],
  [LEVELS_KEYS.level2]: [
    LEVELS_KEYS.level3,
    LEVELS_KEYS.level4,
    LEVELS_KEYS.level5,
  ],
  [LEVELS_KEYS.level3]: [LEVELS_KEYS.level4, LEVELS_KEYS.level5],
  [LEVELS_KEYS.level4]: [LEVELS_KEYS.level5],
  [LEVELS_KEYS.level5]: [],
};
