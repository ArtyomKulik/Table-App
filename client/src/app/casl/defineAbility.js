import { PureAbility, AbilityBuilder } from "@casl/ability";

const defineAbility = (user = {}) => {
  const { can, cannot, build } = new AbilityBuilder(PureAbility);
  const options = {
    fieldMatcher: (fields) => (parent) => !fields || fields.includes(parent),
  };

  can("read", "Tables");

  if (user) {
    if (user.role === "admin") {
      can("manage", "all");
    } else if (user.role === "textEditor") {
      can("update", "Tables", "text");
    } else if (user.role === "linkEditor") {
      can("update", "Tables", "link");
    } else {
      can("read", "Tables");
    }
  } else {
    can("read", "Tables");
  }
  cannot("delete", "Tables");
  return build(options);
};

export default defineAbility;
