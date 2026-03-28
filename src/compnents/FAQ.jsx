import React, { useState } from 'react'

const faqs = [
  {
    question: 'How do I know if my product is eligible for a refund?',
    answer:
      'You can check our Returns & Refunds Policy on the product page or in your order confirmation. Generally, products must be unused, in original packaging, and requested within the return window (usually 30 days).',
  },
  {
    question: 'How long do I have to initiate my request for a refund?',
    answer:
      'Refund requests should be initiated within 30 days of delivery. Some products may have different windows; please review the product-specific terms.',
  },
  {
    question: 'How do I pack my return parcel to make sure it arrives in adequate condition?',
    answer:
      'Use the original packaging when possible, add protective material (like bubble wrap), secure the box with tape, and include the returns form or order reference inside. Proper packaging helps prevent damage during transit.',
  },
  {
    question: 'What can I do if my return request was not accepted?',
    answer:
      'Contact customer support with photos and order details. We will review the issue and explain whether further help is possible or if additional steps are required.',
  },
  {
    question: 'Do I have to pay for shipping charges when I return a product?',
    answer:
      'Return shipping costs vary by policy and reason for return. If the return is due to a defect or wrong item, we often cover shipping. For voluntary changes of mind, charges may apply.',
  },
  {
    question: 'How can I track my return?',
    answer:
      'Use your carrier tracking number sent to you after drop-off. You can also log into your account and check the order status in the Returns section.',
  },
  {
    question: 'How will I get my refund and how long will it take?',
    answer:
      'Refunds are issued via your original payment method within 5-7 business days after we receive and inspect your return. Some banks may take extra time to post the credit.',
  },
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFaq = index => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="min-h-screen flex flex-col items-center lg:justify-center  py-5 px-4 md:px-8">
      <div className="w-full ">
        <h1 className="text-3xl  md:text-4xl font-bold mt-15 lg:mt-0 text-[#40003a] mb-2 fjalla-one-regular">Returns & Refunds FAQs</h1>
        <p className="text-sm md:text-base text-gray-600 mb-8">Find your answers below. Click each question to expand and read the full response.</p>

        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-xl">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={index} className="border-b last:border-b-0">
                <button
                  className="w-full px-3 py-4 md:px-6 md:py-4 text-left flex justify-between items-center bg-white hover:bg-[#d3cfcf] focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-semibold text-[14px] md:text-base text-gray-800">{item.question}</span>
                  <span className={`text-2xl font-bold text-[#2d2f9c] transform transition-all duration-600 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                    +
                  </span>
                </button>
                <div className={`${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden transition duration-600 px-6`}>
                  <p className="py-5 text-gray-600 text-[12px] md:text-base leading-relaxed">{item.answer}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQ
