
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Do you track flights for airport pickups?",
      answer: "Yes! We monitor all flight arrivals and departures in real-time. If your flight is delayed, we'll adjust your pickup time accordingly at no extra charge."
    },
    {
      question: "How much waiting time is included?",
      answer: "For airport pickups, we include 15 minutes of complimentary waiting time for domestic flights and 30 minutes for international flights. For other pickups, we include 5 minutes of waiting time."
    },
    {
      question: "What's your cancellation policy?",
      answer: "You can cancel or modify your reservation up to 2 hours before your scheduled pickup time for a full refund. Cancellations within 2 hours are subject to a 50% charge."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), cash, and corporate accounts. Payment can be made in advance online or in the vehicle."
    },
    {
      question: "Are your vehicles and drivers insured?",
      answer: "Absolutely! All our vehicles are fully insured and our chauffeurs are licensed, bonded, and have passed comprehensive background checks."
    },
    {
      question: "Can I make stops along the way?",
      answer: "Yes, additional stops can be arranged. There's a small fee for each additional stop, and waiting time applies if you need to exit the vehicle."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600">
              Everything you need to know about our service
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="shadow-sm">
                <CardHeader 
                  className="cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <CardTitle className="text-lg text-slate-900 flex justify-between items-center">
                    {faq.question}
                    <span className="text-amber-500">
                      {openIndex === index ? '−' : '+'}
                    </span>
                  </CardTitle>
                </CardHeader>
                {openIndex === index && (
                  <CardContent className="pt-0">
                    <p className="text-slate-700">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
