# Accessibility Comparison Notes

## 1. Modal Focus Management

My handmade modal manually moves focus into the dialog and creates a basic
focus trap using Tab and Shift+Tab.

The shadcn dialog implementation provides more robust focus management and
handles focus behavior through its underlying dialog primitives.

## 2. Dialog Structure

My implementation manually defines the dialog role, aria-modal,
aria-labelledby, and aria-describedby attributes.

The shadcn implementation provides these accessibility relationships through
its dialog components, reducing the amount of accessibility behavior that
must be implemented manually.

## 3. Tabs Keyboard Interaction

My tabs implementation supports ArrowLeft, ArrowRight, Home, and End.

The shadcn tabs implementation provides the tab semantics and keyboard
interaction as part of the component system, making the behavior more
consistent and reusable.

## 4. Main Lesson

Building the components myself helped me understand what accessibility
behavior is actually required. Using shadcn then showed me how a component
library packages those behaviors into reusable components.