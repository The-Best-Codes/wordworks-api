import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-linear-to-b from-blue-200 to-white dark:from-blue-900 dark:to-gray-900">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold mb-6 text-blue-800 dark:text-white">
          WordWorks API
        </h1>
        <p className="text-xl mb-8 text-gray-700 dark:text-gray-300">
          Powerful natural language processing tools at your fingertips. Analyze
          sentiment, extract emotions, tokenize text, and more!
        </p>
        <div className="space-y-4">
          <Link
            href="https://documenter.getpostman.com/view/36348829/2sA3kSoNjY"
            className="inline-block bg-blue-600 text-white dark:bg-gray-800 dark:text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-gray-700 transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            View API Documentation
          </Link>
          <p className="text-gray-600 dark:text-gray-300">
            Explore our comprehensive API documentation to get started with
            WordWorks.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "Sentiment Analysis",
            "Emotion Detection",
            "Parts of Speech Tagging",
          ].map((feature) => (
            <div
              key={feature}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <h2 className="text-lg font-semibold text-blue-800 dark:text-white mb-2">
                {feature}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Unlock the power of text analysis with our advanced NLP
                capabilities.
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
