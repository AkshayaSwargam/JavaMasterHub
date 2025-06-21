import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

// SVG Icon Components
const ChevronLeftIcon = ({ className, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="3.5"
    stroke="currentColor"
    className={className}
    onClick={onClick}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
  </svg>
);

const ClipboardIcon = ({ className, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className={className}
    onClick={onClick}
    aria-label="Copy code to clipboard"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125H3.375c-.621 0-1.125-.504-1.125-1.125V10.5a1.125 1.125 0 011.125-1.125h3.375M9 5.25V3.375c0-.621.504-1.125 1.125-1.125h3.375c.621 0 1.125.504 1.125 1.125V5.25M12 9.75H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25h6.75a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25H12a2.25 2.25 0 01-2.25-2.25V9.75M12 7.5h3.75c.621 0 1.125.504 1.125 1.125v3.375M21.75 12V6.75a2.25 2.25 0 00-2.25-2.25H15M17.25 12H21.75V6.75M12 7.5a2.25 2.25 0 01-2.25-2.25V3.375M12 7.5V3.375M12 7.5H3.75" />
  </svg>
);


function Concepts({ sectionClasses }) {
  const [searchTerm, setSearchTerm] = useState('');
  // State to hold the currently selected concept for full-page view
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [copyMessage, setCopyMessage] = useState(''); // State for copy message

  /**
   * Displays a temporary message for copy operations.
   * @param {string} message - The message to display (e.g., "Code copied!").
   * @param {number} duration - How long the message should be visible in milliseconds.
   */
  const showCopyMessage = (message, duration = 2000) => {
    setCopyMessage(message);
    setTimeout(() => {
      setCopyMessage('');
    }, duration);
  };

  /**
   * Copies the provided code string to the user's clipboard.
   * Provides feedback via `showCopyMessage`.
   * @param {string} code - The code string to copy.
   */
  const copyCodeToClipboard = (code) => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showCopyMessage('Code copied!');
    } catch (err) {
      showCopyMessage('Failed to copy code.');
      console.error('Failed to copy code: ', err);
    }
  };

  // Your 'javaConcepts' array.
  const javaConcepts = [
    {
      id: 'intro',
      title: "Introduction to Java (WORA!)",
      keywords: ["Java", "JVM", "JRE", "JDK", "WORA", "Platform Independent", "Object-Oriented"],
      description: `Java is a **high-level, object-oriented** language. Its core promise is **WORA (Write Once, Run Anywhere)**, meaning compiled Java code works across platforms.

It's powered by the **JVM (Java Virtual Machine)**, which executes bytecode.
* **JRE (Java Runtime Environment):** For running Java applications.
* **JDK (Java Development Kit):** For developing Java applications (includes JRE + development tools).`,
      code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`,
      quickTip: "💡 **JVM** is key for portability. **JDK** for devs, **JRE** for users."
    },
    {
      id: 'variables',
      title: "Variables & Data Types",
      keywords: ["Variables", "Data Types", "Primitive", "Non-Primitive", "int", "String", "boolean", "double"],
      description: `Variables are containers for data. Java is **strongly typed**; every variable needs a declared type.

**Primitive types** store simple values directly (e.g., \`int\`, \`boolean\`, \`double\`). **Non-primitive types** (or reference types) are objects (e.g., \`String\`, \`Arrays\`, custom classes) and store memory addresses.`,
      code: `int age = 30; // Primitive
String name = "Alice"; // Non-primitive
boolean isActive = true; // Primitive
double price = 19.99; // Primitive`,
      quickTip: "📌 Primitives hold values; Non-primitives hold references. Use `final` for constants!"
    },
    {
      id: 'operators',
      title: "Operators: Your Code's Action Heroes!",
      keywords: ["Operators", "Arithmetic", "Assignment", "Comparison", "Logical", "Bitwise", "Ternary"],
      description: `Operators perform actions on variables and values. You'll use them constantly!

**Common Types:**
* **Arithmetic:** \`+\`, \`-\`, \`*\`, \`/\`, \`%\` (modulus), \`++\`, \`--\`
* **Assignment:** \`=\`, \`+=\`, \`-=\`
* **Comparison:** \`==\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\` (return boolean)
* **Logical:** \`&&\` (AND), \`||\` (OR), \`!\` (NOT)
* **Ternary:** A concise \`if-else\` for simple conditions.`,
      code: `int x = 10, y = 3;
System.out.println(x + y); // 13
System.out.println(x % y); // 1 (remainder)
boolean isAdult = (age >= 18); // Comparison
String status = isAdult ? "Adult" : "Minor"; // Ternary`,
      quickTip: "⚡️ Understand **operator precedence** to avoid unexpected results."
    },
    {
        id: 'control-flow',
        title: "Control Flow: Guiding Your Code's Journey",
        keywords: ["Control Flow", "Conditional", "Loop", "if-else", "switch", "for", "while", "do-while", "break", "continue"],
        description: "Control flow dictates the order of execution. \n\n**Conditional Statements:** Choose execution paths.\n* `if-else if-else`: Executes blocks based on conditions.\n* `switch`: Selects a block based on a value (Java 14+ has switch expressions!)\n\n**Loop Statements:** Repeat blocks of code.\n* `for` loop: Ideal when iterations are known.\n* `while` loop: Continues as long as a condition is true.\n* `do-while` loop: Executes at least once, then checks condition.\n* **Enhanced For-Loop (For-Each):** Simple iteration over arrays/collections.\n\n**Flow Modifiers:** `break` (exit loop/switch) and `continue` (skip current iteration).",
        code: `int day = 3;
switch (day) {
    case 1: System.out.println("Mon"); break;
    default: System.out.println("Other");
}

for (int i = 0; i < 3; i++) {
    if (i == 1) continue; // Skips 1
    System.out.println(i); // Prints 0, 2
}`,
        quickTip: "🔄 Choose the right loop for the job; `break` and `continue` offer fine-grained control."
    },
    {
        id: 'arrays',
        title: "Arrays: Collections of Same Type",
        keywords: ["Arrays", "Fixed Size", "Homogeneous", "Multi-dimensional"],
        description: "Arrays store **multiple values of the same data type** in a single variable. They are **fixed-size** once created and are treated as objects in Java.",
        code: `// Declare and initialize
int[] numbers = {10, 20, 30};
String[] names = new String[2]; // Array of size 2 (default null)
names[0] = "Bob";
names[1] = "Charlie";

System.out.println(numbers[0]); // Access element: 10
System.out.println(names.length); // Get length: 2

// Multi-dimensional array
int[][] matrix = {{1, 2}, {3, 4}};`,
        quickTip: "⚠️ Arrays are fixed size! Consider `ArrayList` for dynamic collections."
    },
    {
        id: 'methods',
        title: "Methods: Your Code's Building Blocks",
        keywords: ["Methods", "Functions", "Return Type", "Parameters", "Method Overloading"],
        description: "A method is a block of code that performs a specific task. Methods are defined within classes and are crucial for code reusability and organization.\n\n**Key Parts:**\n* **Return Type:** The type of value the method sends back (`void` if nothing).\n* **Parameters:** Inputs the method accepts.\n* **Method Overloading:** Having multiple methods with the same name but different parameter lists.",
        code: `public class Calculator {
    // Method that returns an int
    public static int add(int a, int b) {
        return a + b;
    }

    // Method that returns nothing (void)
    public void greet(String name) {
        System.out.println("Hello, " + name + "!");
    }
}`,
        quickTip: "✅ Use methods to break down complex tasks into smaller, manageable pieces."
    },
    {
        id: 'classes-objects',
        title: "Classes & Objects: The Heart of OOP",
        keywords: ["Class", "Object", "Instance", "Attributes", "Methods", "Constructor", "this"],
        description: "In OOP, a **class** is a **blueprint** or template for creating objects. It defines common attributes (variables) and behaviors (methods).\n\nAn **object** is a concrete **instance** of a class. When you create an object, you instantiate the class.\n\n**Constructors** are special methods used to initialize objects when they are created (e.g., `new Dog(...)`). The `this` keyword refers to the current object.",
        code: `// Class definition
public class Dog {
    String name; // Attribute
    int age;     // Attribute

    // Constructor
    public Dog(String name, int age) {
        this.name = name; // 'this' refers to the object's 'name'
        this.age = age;
    }

    // Method
    public void bark() {
        System.out.println(name + " says Woof!");
    }
}

// Object creation and usage
Dog myDog = new Dog("Buddy", 3);
System.out.println(myDog.name); // Access attribute
myDog.bark(); // Call method`,
        quickTip: "🌟 Think of a Class as a cookie cutter, and an Object as the cookie itself!"
    },
    {
        id: 'access-modifiers',
        title: "Access Modifiers: Controlling Visibility",
        keywords: ["Access Modifiers", "public", "private", "protected", "default", "Scope"],
        description: "Access modifiers determine the **visibility (scope)** of classes, fields, methods, and constructors. They are crucial for **encapsulation**.\n\n* **`public`**: Accessible from anywhere.\n* **`private`**: Accessible only within the declaring class.\n* **`protected`**: Accessible within the same package and by subclasses (even in different packages).\n* **`default`** (no keyword): Accessible only within the same package.",
        code: `public class MyClass {
    public int publicVar;
    private int privateVar; // Only MyClass can access
    protected int protectedVar; // Package + Subclasses
    int defaultVar; // Package only
}`,
        quickTip: "💡 Use `private` for fields and `public` for methods (getters/setters) to enforce encapsulation."
    },
    {
        id: 'inheritance',
        title: "Inheritance (OOP): Building on Existing Code",
        keywords: ["Inheritance", "extends", "super", "Subclass", "Superclass", "Method Overriding", "Code Reusability"],
        description: "Inheritance is an OOP mechanism where a class (**subclass** or child) can **inherit** attributes and methods from another class (**superclass** or parent). It promotes **code reusability**.\n\n* Uses the **`extends`** keyword.\n* The **`super`** keyword refers to the parent class's members (e.g., `super()` to call parent constructor).\n* **Method Overriding:** A subclass provides a specific implementation of a method already in its superclass.",
        code: `class Animal {
    void eat() { System.out.println("eating..."); }
}
class Dog extends Animal { // Dog inherits from Animal
    @Override
    void eat() { System.out.println("dog is eating..."); } // Method Overriding
    void bark() { System.out.println("barking..."); }
}
// Usage: Dog d = new Dog(); d.eat(); // Calls Dog's eat()`,
        quickTip: "♻️ Don't repeat yourself! Inheritance helps you reuse code and create specialized classes."
    },
    {
        id: 'polymorphism',
        title: "Polymorphism (OOP): One Interface, Many Forms",
        keywords: ["Polymorphism", "Method Overloading", "Method Overriding", "Dynamic Method Dispatch", "Compile-time", "Run-time"],
        description: "**Polymorphism** means 'many forms.' It allows objects of different classes to be treated as objects of a common superclass. \n\n* **Method Overloading (Compile-time Polymorphism):** Multiple methods with the same name but different parameters within the *same* class.\n* **Method Overriding (Run-time/Dynamic Polymorphism):** A subclass provides its own implementation of a method already present in its superclass. The actual method invoked is determined at runtime based on the object's type.",
        code: `class Animal {
    void makeSound() { System.out.println("Animal sound"); }
}
class Cat extends Animal {
    @Override
    void makeSound() { System.out.println("Meow"); } // Overriding
}
class Dog extends Animal {
    @Override
    void makeSound() { System.out.println("Woof"); } // Overriding
}

// Usage:
Animal myAnimal = new Cat(); // Polymorphism in action!
myAnimal.makeSound(); // Output: Meow
myAnimal = new Dog();
myAnimal.makeSound(); // Output: Woof`,
        quickTip: "✨ Polymorphism simplifies code by letting you interact with objects through a common interface."
    },
    {
        id: 'encapsulation',
        title: "Encapsulation (OOP): Protecting Your Data",
        keywords: ["Encapsulation", "Data Hiding", "Getters", "Setters", "Private Fields"],
        description: "Encapsulation is the bundling of data (variables) and methods (functions) that operate on that data into a single unit (a class). It primarily involves **data hiding**, protecting the internal state of an object from direct external access.\n\nAchieved by:\n* Declaring fields as **`private`**.\n* Providing **`public` getter and setter methods** to control access to these fields. This allows validation or logic before data is read or modified.",
        code: `public class BankAccount {
    private double balance; // Private field

    public double getBalance() { // Public getter
        return balance;
    }
    public void deposit(double amount) { // Public setter (with logic)
        if (amount > 0) {
            this.balance += amount;
        }
    }
}`,
        quickTip: "🔒 Encapsulation helps maintain data integrity and makes code easier to manage."
    },
    {
        id: 'abstraction',
        title: "Abstraction (OOP): Focus on What, Not How",
        keywords: ["Abstraction", "Abstract Class", "Interface", "Abstract Method", "Hiding Details"],
        description: "Abstraction means showing only the essential features of an object while hiding the complex implementation details. It's about 'what' an object does, not 'how' it does it.\n\nAchieved using:\n* **Abstract Classes:** Cannot be instantiated directly. Can have abstract methods (no body) and concrete methods. Subclasses *must* implement abstract methods.\n* **Interfaces:** A contract that defines a set of methods that implementing classes must adhere to. Before Java 8, all methods were implicitly `public abstract`. Now they can also have `default` and `static` methods.",
        code: `// Abstract Class example
public abstract class Vehicle {
    public abstract void drive(); // Abstract method
    public void start() { System.out.println("Vehicle started."); }
}

public class Car extends Vehicle {
    @Override
    public void drive() { System.out.println("Car is driving."); }
}

// Interface example
public interface Drivable {
    void drive(); // Implicitly public abstract
}`,
        quickTip: "✨ Abstraction simplifies complex systems by breaking them into manageable, understandable parts."
    },
    {
        id: 'packages',
        title: "Packages: Organizing Your Code Universe",
        keywords: ["Packages", "Namespace", "Import", "User-defined", "Built-in"],
        description: "Packages are used to **organize classes and interfaces into logical groups**. They help in:\n* **Preventing naming conflicts** (namespace management).\n* **Controlling access** (using access modifiers).\n* Making code more modular and reusable.\n\nJava has built-in packages (e.g., `java.lang`, `java.util`, `java.io`), and you can create your own user-defined packages.",
        code: `// In com.mycompany.app.Utils.java
package com.mycompany.app;

public class Utils {
    // ...
}

// In com.mycompany.main.MainApp.java
package com.mycompany.main;
import com.mycompany.app.Utils; // Importing a class from another package

public class MainApp {
    // ...
}`,
        quickTip: "🧹 Use descriptive package names (e.g., `com.yourcompany.project.module`) to keep your codebase tidy."
    },
    {
        id: 'exceptions',
        title: "Exception Handling: Graceful Error Management",
        keywords: ["Exception Handling", "try-catch-finally", "throw", "throws", "Checked", "Unchecked", "Runtime Exception", "try-with-resources"],
        description: "Exception handling is Java's robust mechanism to manage **runtime errors (exceptions)**, preventing program crashes and allowing for graceful recovery. \n\n* **`try` block**: Contains code that might throw an exception.\n* **`catch` block**: Handles a specific type of exception.\n* **`finally` block**: (Optional) Code that *always* executes, regardless of an exception, often used for resource cleanup.\n* **`throw`**: Explicitly throws an exception.\n* **`throws`**: Declares that a method might throw an exception.\n\n**Types:** **Checked exceptions** (compile-time, must be handled) and **Unchecked (Runtime) exceptions** (runtime, indicate programming errors). `try-with-resources` (Java 7+) simplifies resource closing.",
        code: `try {
    int result = 10 / 0; // Throws ArithmeticException (unchecked)
    System.out.println(result);
} catch (ArithmeticException e) {
    System.err.println("Error: " + e.getMessage());
} finally {
    System.out.println("Cleanup complete.");
}

// Method declaring a checked exception
public void readFile(String path) throws IOException {
    // ... file reading logic ...
}`,
        quickTip: "🚨 Always catch specific exceptions before generic ones. Use `try-with-resources` for auto-closing."
    },
    {
        id: 'collections',
        title: "Collections Framework: Managing Data Efficiently",
        keywords: ["Collections", "List", "Set", "Map", "ArrayList", "LinkedList", "HashSet", "HashMap", "Generics", "Iterator", "Comparable", "Comparator"],
        description: "The Java Collections Framework provides interfaces and classes for storing and manipulating groups of objects. It's your go-to for efficient data structures.\n\n* **`List`**: Ordered, allows duplicates (e.g., `ArrayList`, `LinkedList`).\n* **`Set`**: Unordered, no duplicates (e.g., `HashSet`, `TreeSet`).\n* **`Queue`**: FIFO processing (e.g., `LinkedList`, `PriorityQueue`).\n* **`Map`**: Key-value pairs, unique keys (e.g., `HashMap`, `TreeMap`).\n\n**Generics (`<T>`)** ensure type safety. **`Iterator`** helps traverse collections. **`Comparable`** and **`Comparator`** enable custom sorting.",
        code: `import java.util.*;
List<String> names = new ArrayList<>();
names.add("Alice");
names.add("Bob");
names.add("Alice"); // Duplicates allowed
System.out.println(names); // [Alice, Bob, Alice]

Set<String> uniqueNames = new HashSet<>();
uniqueNames.add("Alice");
uniqueNames.add("Bob");
uniqueNames.add("Alice"); // Duplicate ignored
System.out.println(uniqueNames); // [Bob, Alice] (order not guaranteed)

Map<String, Integer> ages = new HashMap<>();
ages.put("Alice", 30);
ages.put("Bob", 25);
System.out.println(ages.get("Alice")); // 30`,
        quickTip: "🧠 Choose the right collection for your needs: `ArrayList` for indexed access, `HashSet` for uniqueness, `HashMap` for fast key-value lookups."
    },
    {
        id: 'multithreading',
        title: "Multithreading: Concurrent Power",
        keywords: ["Multithreading", "Thread", "Runnable", "Concurrency", "Synchronization", "wait", "notify", "Deadlock", "ExecutorService"],
        description: "Multithreading allows multiple parts of a program to execute concurrently (seemingly at the same time). A **thread** is a lightweight sub-process.\n\n* **Creating Threads:** Extend `Thread` class or (preferred) implement `Runnable` interface.\n* **Synchronization:** Essential for shared resources to prevent data corruption. Uses `synchronized` keyword (methods/blocks) or `java.util.concurrent` utilities.\n* `wait()`, `notify()`, `notifyAll()`: For inter-thread communication.\n* **Deadlock:** A state where threads are blocked indefinitely waiting for each other.\n* `ExecutorService`: Manages pools of threads for efficient execution.",
        code: `// Option 1: Implement Runnable
class MyTask implements Runnable {
    public void run() { System.out.println("Task running!"); }
}
new Thread(new MyTask()).start();

// Option 2: Extend Thread
class MyThread extends Thread {
    public void run() { System.out.println("Thread running!"); }
}
new MyThread().start();

// Synchronization example
public synchronized void increment() { /* safe increment */ }`,
        quickTip: "⚠️ Handle shared resources carefully with `synchronized` or concurrent utilities to avoid race conditions and deadlocks."
    },
    {
        id: 'file-io',
        title: "File I/O: Reading & Writing Data",
        keywords: ["File I/O", "InputStream", "OutputStream", "Reader", "Writer", "FileInputStream", "FileOutputStream", "BufferedReader", "BufferedWriter", "Scanner", "NIO.2", "Files", "Path"],
        description: "File I/O involves reading data from and writing data to files. Java provides a rich set of classes for this.\n\n* **Byte Streams (`InputStream`, `OutputStream`):** For raw binary data (e.g., `FileInputStream`, `FileOutputStream`).\n* **Character Streams (`Reader`, `Writer`): For text data (e.g., `FileReader`, `FileWriter`, `BufferedReader`, `BufferedWriter`).\n* **`Scanner`**: Useful for reading input (including files) token by token.\n* **NIO.2 (`java.nio.file`):** Modern API (`Path`, `Files` classes) for simpler and more robust file system operations.",
        code: `import java.io.*;
import java.nio.file.*; // For NIO.2

// Writing to a file (modern way with NIO.2)
Path filePath = Paths.get("my_file.txt");
try {
    Files.write(filePath, "Hello, Java I/O!".getBytes());
} catch (IOException e) { e.printStackTrace(); }

// Reading from a file (traditional BufferedReader)
try (BufferedReader reader = new BufferedReader(new FileReader("my_file.txt"))) {
    String line = reader.readLine();
    System.out.println(line);
} catch (IOException e) { e.printStackTrace(); }`,
        quickTip: "✅ Always close I/O resources (use `try-with-resources` for auto-closing) to prevent leaks."
    }
  ];
  // --- END javaConcepts array ---

  // Filter concepts based on search term
  const filteredConcepts = javaConcepts.filter(concept =>
    concept.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    concept.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (concept.keywords && concept.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  // Function to navigate to a specific concept's detail page
  const goToConceptDetail = (concept) => {
    setSelectedConcept(concept);
  };

  // Function to go back to the main grid view
  const goBackToGrid = () => {
    setSelectedConcept(null);
  };

  return (
    <div className={`${sectionClasses} py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-blue-50 to-indigo-100 via-purple-50 min-h-screen font-sans relative flex flex-col items-center justify-start`}>
      {/* Background Ornaments (Subtle, large shapes for visual interest) */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob-one"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob-two"></div>
      <div className="absolute top-0 right-1/4 w-48 h-48 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob-three"></div>


      {/* Page Title and Description Section */}
      <div className="text-center mb-10 relative z-10 animate-fadeInUp">
        <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-900 mb-6 drop-shadow-lg leading-tight">
          Master Java: Your Interactive Cheat Sheet
        </h2>
        <p className="text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed font-light">
          Dive into the core concepts of Java with quick explanations, real-world code snippets, and essential tips.
        </p>
      </div>

      {/* Search Input Section (only visible in grid view) */}
      {!selectedConcept && (
        <input
          type="text"
          placeholder="🔍 Search for concepts, keywords, or topics..."
          className="w-full max-w-xl p-4 mb-10 border-2 border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-6 focus:ring-indigo-400 focus:border-indigo-500 text-lg placeholder-gray-500 transition-all duration-400 ease-in-out hover:shadow-2xl bg-white animate-scaleIn relative z-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}

      {/* Conditional Rendering: Grid View or Detail View */}
      {selectedConcept ? (
        // --- Full-Page Detail View ---
        <div className="relative w-full max-w-5xl bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-indigo-500 flex flex-col animate-slide-in-detail z-10">

          {/* Back Button */}
          <button
            onClick={goBackToGrid}
            className="absolute top-6 left-6 bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full shadow-md transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 pr-3 pl-2 text-lg font-medium"
            aria-label="Back to Concepts"
          >
            <ChevronLeftIcon className="w-6 h-6" />
            <span>Back to Concepts</span>
          </button>

          {/* Concept Content (similar to previous carousel card) */}
          <div className="flex flex-col h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-indigo-50 mt-16 md:mt-20">
            {/* Concept Title */}
            <h3 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-700 leading-tight mb-6 drop-shadow-sm">
              {selectedConcept.title}
            </h3>

            {/* Keyword Tags */}
            {selectedConcept.keywords && selectedConcept.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedConcept.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="text-base font-medium text-purple-700 bg-purple-100 px-5 py-2 rounded-full shadow-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            )}

            {/* ReactMarkdown Description */}
            <div className="text-gray-700 leading-relaxed text-lg mb-10 markdown-content">
              <ReactMarkdown
                components={{
                  p: ({ node, ...props }) => <div className="mb-4 text-gray-700" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 pl-6 space-y-2 text-gray-700" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 pl-6 space-y-2 text-gray-700" {...props} />,
                  li: ({ node, ...props }) => <li className="text-gray-700 leading-relaxed" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-bold text-blue-800" {...props} />,
                  em: ({ node, ...props }) => <em className="italic text-gray-600" {...props} />,
                  code: ({ node, inline, className, children, ...props }) => {
                    if (inline) {
                      return <code className="bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded-md text-sm font-mono whitespace-nowrap" {...props}>{children}</code>;
                    }
                    return (
                      <pre className="bg-gray-900 text-white rounded-lg p-5 font-mono text-sm overflow-x-auto shadow-inner mt-6 mb-6">
                        <code className="block" {...props}>
                          {children}
                        </code>
                      </pre>
                    );
                  }
                }}
              >
                {selectedConcept.description}
              </ReactMarkdown>
            </div>

            {/* Code Block */}
            {selectedConcept.code && (
              <div className="relative bg-gray-900 text-white rounded-lg p-6 font-mono text-sm overflow-x-auto mb-10 shadow-xl border border-gray-700">
                <pre><code className="language-java">{selectedConcept.code.trim()}</code></pre>
                <ClipboardIcon
                  className="absolute top-4 right-4 w-7 h-7 text-gray-400 hover:text-cyan-300 cursor-pointer transition-colors duration-200 transform hover:scale-110"
                  onClick={(e) => { e.stopPropagation(); copyCodeToClipboard(selectedConcept.code); }}
                />
                {copyMessage && (
                  <div className="absolute top-1 right-12 bg-green-600 text-white text-xs py-1.5 px-3 rounded-full animate-fade-in-out-message shadow-lg">
                    {copyMessage}
                  </div>
                )}
              </div>
            )}

            {/* Quick Tip */}
            {selectedConcept.quickTip && (
              <div className="text-yellow-800 font-semibold text-base p-5 bg-yellow-100 rounded-xl border border-yellow-300 italic shadow-lg flex items-start mt-auto">
                <span className="text-2xl mr-3">💡</span>
                <ReactMarkdown components={{
                    p: ({ node, ...props }) => <div {...props} />,
                    strong: ({ node, ...props }) => <strong className="font-extrabold text-yellow-900" {...props} />,
                    em: ({ node, ...props }) => <em className="italic" {...props} />
                }}>{selectedConcept.quickTip}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      ) : (
        // --- Grid View ---
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 md:gap-x-10 relative z-10 w-full">
          {filteredConcepts.length > 0 ? (
            filteredConcepts.map((concept, index) => (
              <div
                key={concept.id}
                className={`
                  relative bg-white rounded-3xl p-8 shadow-xl border border-transparent
                  transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl
                  flex flex-col justify-between cursor-pointer
                  hover:border-blue-300
                  min-h-[180px] flex-grow animate-cardFadeIn
                `}
                onClick={() => goToConceptDetail(concept)} // Click to view detail
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card Header with Title */}
                <div className="flex justify-between items-start mb-4 border-b-2 border-gray-100 pb-3">
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-700 leading-tight pr-4">
                    {concept.title}
                  </h3>
                </div>

                {/* Truncated Description */}
                <div className="text-gray-600 text-sm mb-4 line-clamp-3">
                  <ReactMarkdown
                      components={{
                          p: ({ node, ...props }) => <div {...props} />,
                          strong: ({ node, ...props }) => <strong className="font-bold" {...props} />
                      }}
                  >
                      {concept.description}
                  </ReactMarkdown>
                </div>

                {/* Keyword Tags */}
                {concept.keywords && concept.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {concept.keywords.slice(0, 3).map((keyword, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium text-purple-700 bg-purple-100 px-3 py-1.5 rounded-full shadow-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 text-2xl md:text-3xl col-span-full py-20 font-semibold animate-pulse-subtle">
              😔 No concepts found matching your search. Try a different keyword!
            </p>
          )}
        </div>
      )}

      {/* Custom CSS Keyframes and Scrollbar Styling */}
      <style>
        {`
        /* Scrollbar styles */
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: var(--tw-scrollbar-thumb) var(--tw-scrollbar-track);
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 8px; /* For vertical scrollbar */
          height: 8px; /* For horizontal scrollbar */
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: var(--tw-scrollbar-thumb);
          border-radius: 9999px;
          border: 2px solid var(--tw-scrollbar-track);
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background-color: var(--tw-scrollbar-track);
          border-radius: 9999px;
        }

        .scrollbar-thumb-indigo-300 { --tw-scrollbar-thumb: #a78bfa; }
        .scrollbar-track-indigo-50 { --tw-scrollbar-track: #eef2ff; }

        /* Animations */
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes cardFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        /* Animation for full-page detail view */
        @keyframes slide-in-detail {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes rotate-in { from { transform: rotate(0deg); opacity: 0; } to { transform: rotate(180deg); opacity: 1; } }
        @keyframes rotate-out { from { transform: rotate(180deg); opacity: 1; } to { transform: rotate(0deg); opacity: 1; } }
        @keyframes slide-in-down-content { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fade-in-out-message {
            0% { opacity: 0; transform: translateY(10px); }
            10% { opacity: 1; transform: translateY(0); }
            90% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(10px); }
        }
        @keyframes pulse-subtle { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.01); opacity: 0.9; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes pulse-emoji { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        @keyframes fade-in-tag { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes blob-one { 0% { transform: translate(0, 0) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0, 0) scale(1); } }
        @keyframes blob-two { 0% { transform: translate(0, 0) scale(1); } 40% { transform: translate(-40px, 60px) scale(0.9); } 70% { transform: translate(10px, -30px) scale(1.2); } 100% { transform: translate(0, 0) scale(1); } }
        @keyframes blob-three { 0% { transform: translate(0, 0) scale(1); } 25% { transform: translate(20px, 40px) scale(1.1); } 75% { transform: translate(-10px, -60px) scale(0.95); } 100% { transform: translate(0, 0) scale(1); } }

        /* Applying animations */
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.6s ease-out forwards; }
        .animate-cardFadeIn { animation: cardFadeIn 0.7s ease-out forwards; }
        .animate-slide-in-detail { animation: slide-in-detail 0.5s ease-out forwards; }
        .animate-rotate-in { animation: rotate-in 0.3s ease-out forwards; }
        .animate-rotate-out { animation: rotate-out 0.3s ease-out forwards; }
        .animate-slide-in-down-content { animation: slide-in-down-content 0.4s ease-out forwards; }
        .animate-fade-in-out-message { animation: fade-in-out-message 2.5s ease-out forwards; }
        .animate-pulse-subtle { animation: pulse-subtle 2s infinite ease-in-out; }
        .animate-pulse-emoji { animation: pulse-emoji 1.5s infinite ease-in-out; }
        .animate-fade-in-tag { animation: fade-in-tag 0.4s ease-out forwards; }
        .animate-blob-one { animation: blob-one 18s infinite alternate ease-in-out; }
        .animate-blob-two { animation: blob-two 22s infinite alternate-reverse ease-in-out; }
        .animate-blob-three { animation: blob-three 15s infinite alternate ease-in-out; }
        `}
      </style>
    </div>
  );
}

export default Concepts;
