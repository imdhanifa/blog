import type { Post } from "../types/post";

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "Minimal APIs in .NET 8",
    description: "Lightweight way to build APIs with reduced boilerplate.",
    content: "Minimal APIs let you define routes directly without controllers, making them ideal for microservices and prototypes.",
    code: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/hello", () => "Hello World");

app.Run();`,
    createdAt: "2025-01-17T09:00:00Z",
    author: "Mohamed Hanifa",
    image: "/images/dotnet-minimal-api.png",
    tags: [".NET", "MinimalAPI", "C#", "WebAPI"],
    language: "csharp"
  },
  {
    id: "2",
    title: "Channels in .NET",
    description: "System.Threading.Channels for producer-consumer scenarios.",
    content: "Channels provide a thread-safe way to pass messages between producers and consumers asynchronously.",
    code: `var channel = Channel.CreateUnbounded<int>();

// Producer
_ = Task.Run(async () => {
  for (int i = 1; i <= 5; i++) {
    await channel.Writer.WriteAsync(i);
    Console.WriteLine($"Produced {i}");
  }
  channel.Writer.Complete();
});

// Consumer
await foreach (var item in channel.Reader.ReadAllAsync()) {
  Console.WriteLine($"Consumed {item}");
}`,
    createdAt: "2025-01-18T09:00:00Z",
    author: "Mohamed Hanifa",
    image: "/images/dotnet-channels.png",
    tags: [".NET", "Channels", "Concurrency", "C#"],
    language: "csharp"
  },
  {
    id: "3",
    title: "ConcurrentBag in .NET",
    description: "Thread-safe collection for unordered data.",
    content: "ConcurrentBag allows multiple threads to add/remove items safely without locking.",
    code: `var bag = new ConcurrentBag<int>();

Parallel.For(0, 5, i => {
  bag.Add(i);
  Console.WriteLine($"Added {i}");
});

while (bag.TryTake(out int item)) {
  Console.WriteLine($"Removed {item}");
}`,
    createdAt: "2025-01-19T09:00:00Z",
    author: "Mohamed Hanifa",
    image: "/images/dotnet-concurrentbag.png",
    tags: [".NET", "ConcurrentBag", "Threading", "C#"],
    language: "csharp"
  },
  {
    id: "4",
    title: "Task vs Thread in .NET",
    description: "Understanding the difference between Tasks and Threads.",
    content: "Thread represents a low-level unit of execution, while Task is a higher-level abstraction built on the ThreadPool for easier async programming.",
    code: `// Thread
var thread = new Thread(() => Console.WriteLine("Running in a Thread"));
thread.Start();

// Task
await Task.Run(() => Console.WriteLine("Running in a Task"));`,
    createdAt: "2025-01-20T09:00:00Z",
    author: "Mohamed Hanifa",
    image: "/images/dotnet-task-vs-thread.png",
    tags: [".NET", "Task", "Thread", "Async", "C#"],
    language: "csharp"
  },
  {
    id: "5",
    title: "LINQ in C#",
    description: "Query collections easily with LINQ.",
    content: "LINQ (Language Integrated Query) provides a powerful way to query collections and databases with readable syntax.",
    code: `var numbers = new[] { 1, 2, 3, 4, 5, 6 };
var evens = numbers.Where(n => n % 2 == 0);

foreach (var n in evens)
  Console.WriteLine(n);`,
    createdAt: "2025-01-21T09:00:00Z",
    author: "Mohamed Hanifa",
    image: "/images/dotnet-linq.png",
    tags: ["C#", "LINQ", "Collections", ".NET"],
    language: "csharp"
  },
  {
    id: "6",
    title: "let and const in ES6",
    description: "Block-scoped variable declarations in ES6.",
    content: "let allows reassignment, const prevents reassignment. Both are block-scoped unlike var.",
    code: `let name = "Hanifa";
name = "Mohamed";

const pi = 3.14;
// pi = 3.14159; // Error
console.log(name, pi);`,
    createdAt: "2025-01-22T09:00:00Z",
    author: "Mohamed Hanifa",
    image: "/images/js-let-const.png",
    tags: ["JavaScript", "ES6", "let", "const"],
    language: "javascript"
  },
  {
    id: "7",
    title: "Arrow Functions in ES6",
    description: "Concise syntax for functions.",
    content: "Arrow functions provide shorter syntax and lexical this binding.",
    code: `const add = (a, b) => a + b;
console.log(add(2, 3));`,
    createdAt: "2025-01-23T09:00:00Z",
    author: "Mohamed Hanifa",
    image: "/images/js-arrow-functions.png",
    tags: ["JavaScript", "ES6", "ArrowFunctions"],
    language: "javascript"
  },
  {
    id: "8",
    title: "Template Literals in ES6",
    description: "Use backticks for multi-line strings and interpolation.",
    content: "Template literals make string concatenation easier with ${}.",
    code: `const name = "Hanifa";
const greeting = \`Hello, \${name}! Welcome to ES6.\`;
console.log(greeting);`,
    createdAt: "2025-01-24T09:00:00Z",
    author: "Mohamed Hanifa",
    image: "/images/js-template-literals.png",
    tags: ["JavaScript", "ES6", "TemplateLiterals"],
    language: "javascript"
  },
  {
    id: "9",
    title: "Destructuring in ES6",
    description: "Extract values from arrays and objects easily.",
    content: "Destructuring simplifies assignments by unpacking values directly.",
    code: `const [a, b] = [10, 20];
const {x, y} = {x: 1, y: 2};

console.log(a, b, x, y);`,
    createdAt: "2025-01-25T09:00:00Z",
    author: "Mohamed Hanifa",
    image: "/images/js-destructuring.png",
    tags: ["JavaScript", "ES6", "Destructuring"],
    language: "javascript"
  },
  {
    id: "10",
    title: "Promises in ES6",
    description: "Handle asynchronous operations with promises.",
    content: "Promises represent a value that will be available now, later, or never.",
    code: `const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Data loaded"), 1000);
});

fetchData.then(data => console.log(data));`,
    createdAt: "2025-01-26T09:00:00Z",
    author: "Mohamed Hanifa",
    image: "/images/js-promises.png",
    tags: ["JavaScript", "ES6", "Promises", "Async"],
    language: "javascript"
  }
];
