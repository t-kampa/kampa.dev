import { describe, expect, test } from "bun:test";
import {
  getAllProjectSlugs,
  getAllProjects,
  getPaginatedProjects,
  getProject,
} from "./projects";

describe("getAllProjects", () => {
  test("returns projects with the required fields populated", () => {
    const projects = getAllProjects();
    expect(projects.length).toBeGreaterThan(0);

    for (const project of projects) {
      expect(project.slug).toBeTruthy();
      expect(project.name).toBeTruthy();
    }
  });
});

describe("getAllProjectSlugs", () => {
  test("has no duplicate slugs", () => {
    const slugs = getAllProjectSlugs();
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("getProject", () => {
  test("finds a project by slug", () => {
    const [first] = getAllProjects();
    expect(getProject(first.slug)?.name).toBe(first.name);
  });

  test("returns undefined for an unknown slug", () => {
    expect(getProject("does-not-exist")).toBeUndefined();
  });
});

describe("getPaginatedProjects", () => {
  const total = getAllProjects().length;

  test("returns every project when perPage covers all of them", () => {
    const { projects, totalPages } = getPaginatedProjects(1, total + 5);
    expect(projects).toHaveLength(total);
    expect(totalPages).toBe(1);
  });

  test("matches Math.ceil(total / perPage) for any page size", () => {
    for (let perPage = 1; perPage <= total + 2; perPage++) {
      const { totalPages } = getPaginatedProjects(1, perPage);
      expect(totalPages).toBe(Math.ceil(total / perPage));
    }
  });

  test("returns an empty page past the last page", () => {
    const { projects } = getPaginatedProjects(total + 1, 1);
    expect(projects).toHaveLength(0);
  });
});
