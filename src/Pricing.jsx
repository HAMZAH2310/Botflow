import { Check } from 'lucide-react'

export default function Pricing() {
  const tiers = [
    {
      name: 'Starter',
      price: '$0',
      description: 'Perfect for exploring AI bot basics.',
      features: ['1 Chatbot', '1,000 Messages/mo', 'Basic Templates', 'Community Support'],
      cta: 'Get Started',
      accent: false
    },
    {
      name: 'Professional',
      price: '$49',
      description: 'Scale your business with advanced AI.',
      features: ['Unlimited Chatbots', 'Unlimited Messages', 'Custom Branding', 'Priority Support', 'CRM Integration'],
      cta: 'Start Free Trial',
      accent: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Dedicated power for large teams.',
      features: ['Dedicated AI Training', 'SLA Guarantee', 'Advanced Analytics', 'Account Manager'],
      cta: 'Contact Sales',
      accent: false
    }
  ]

  return (
    <div className="pricing-section">
      <div className="pricing-header">
        <h2>Simple, Transparent Pricing</h2>
        <p>Choose the plan that's right for your growth.</p>
      </div>

      <div className="pricing-grid">
        {tiers.map((tier, i) => (
          <div key={i} className={`pricing-card ${tier.accent ? 'accent' : ''}`}>
            {tier.accent && <div className="popular-badge">Most Popular</div>}
            <h3>{tier.name}</h3>
            <div className="price">{tier.price}<span>{tier.price !== 'Custom' ? '/mo' : ''}</span></div>
            <p>{tier.description}</p>
            <ul>
              {tier.features.map((f, j) => (
                <li key={j}>
                  <Check size={18} className="check-icon" />
                  {f}
                </li>
              ))}
            </ul>
            <button className={`btn-pricing ${tier.accent ? 'primary' : 'secondary'}`}>
              {tier.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
