import Section from "@/components/common/Section";
import StepCard, { type Step } from "@/components/common/StepCard";

export default function BuildSection() {
  const STEPS: Step[] = [
    {
      index: 1,
      title: "Understand",
      description: (
        <p>
          Most projects fail before a single line of code is written. Not
          because the engineering was bad, but because{" "}
          <span className="font-medium">
            nobody stopped to ask what problem was actually worth solving.
          </span>{" "}
          Before I open a code editor, I talk to users, map their workflows, and
          ask questions that make stakeholders uncomfortable. I want to
          understand the context, the constraints, and the real goal behind the
          requested feature. Only then does the spec start to make sense.
        </p>
      ),
    },
    {
      index: 2,
      title: "Design",
      description: (
        <p>
          Good software is not designed at the keyboard. I work through the full
          user journey before touching components: what the user sees first,
          what they do next, where they get confused,{" "}
          <span className="font-medium">
            what happens when something goes wrong.
          </span>{" "}
          Edge cases are not afterthoughts. Interaction decisions get made on
          paper or in Figma, not in the middle of a sprint. When I sit down to
          build, I already know exactly what I am building and why.
        </p>
      ),
    },
    {
      index: 3,
      title: "Build",
      description: (
        <p>
          I build for the product, not the ticket. That means caring about
          architecture that scales, components that can be reused, and
          performance that holds up under real conditions.{" "}
          <span className="font-medium">
            I write code that the next developer can read without needing to ask
            me questions.
          </span>{" "}
          Clean boundaries, clear abstractions, no clever tricks that nobody
          else will understand in six months.
        </p>
      ),
    },
    {
      index: 4,
      title: "Ship & Improve",
      description: (
        <p>
          Shipping is not the finish line, it is the starting gun.{" "}
          <span className="font-medium">
            Real feedback only comes from real users in production.
          </span>{" "}
          I instrument what matters, watch how people actually use the product,
          and iterate based on what I see rather than what I assumed. The goal
          is not to ship a feature. It is to ship a product that actually solves
          the problem it was built for.
        </p>
      ),
    },
  ];

  return (
    <Section
      tag="How I build products"
      title="A repeatable way of turning problems into products worth shipping."
      isHighlighted
    >
      <div className="divide-y">
        {STEPS.map((s) => (
          <StepCard key={s.index} step={s} />
        ))}
      </div>
    </Section>
  );
}
