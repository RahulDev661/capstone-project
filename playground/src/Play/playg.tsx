import Modal from "./Modal";
import Tabs from "./Tabs";
import Disclosure from "./Disclosure";

export default function Playground() {
  return (
    <main>
      <h1>React Accessibility Playground</h1>

      <p>
        Three interactive components built from scratch with React and
        TypeScript.
      </p>

      <section>
        <h2>1. Modal Dialog</h2>
        <Modal />
      </section>

      <section>
        <h2>2. Tabs</h2>
        <Tabs />
      </section>

      <section>
        <h2>3. Disclosure</h2>
        <Disclosure />
      </section>
    </main>
  );
}