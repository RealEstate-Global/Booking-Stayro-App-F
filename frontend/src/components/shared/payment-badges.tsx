import type { SVGProps } from "react";
import { useLanguage } from "@/i18n/language-provider";

export function MadaBadge(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 54 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="mada"
      className="h-6 w-auto"
      {...props}
    >
      <rect width="54" height="34" rx="5" fill="#FFFFFF" />
      <rect x="0.5" y="0.5" width="53" height="33" rx="4.5" stroke="#E5E7EB" />
      {/* mada green arc */}
      <path
        d="M13 22c3.5-5 9-6 13.5-3.5"
        stroke="#00805E"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* mada blue arc */}
      <path
        d="M27.5 18.5c4.5 2.5 10 1.5 13.5-3.5"
        stroke="#00A3E0"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* mada text */}
      <text
        x="27"
        y="14"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontWeight="800"
        fontSize="9"
        fill="#00805E"
        letterSpacing="-0.3px"
      >
        mada
      </text>
    </svg>
  );
}

export function VisaBadge(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 54 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Visa"
      className="h-6 w-auto"
      {...props}
    >
      <rect width="54" height="34" rx="5" fill="#FFFFFF" />
      <rect x="0.5" y="0.5" width="53" height="33" rx="4.5" stroke="#E5E7EB" />
      <path
        d="M21.8 23h-2.9l1.8-12h2.9l-1.8 12zm8.8-11.7c-.6-.2-1.5-.4-2.7-.4-3 0-5.1 1.6-5.1 3.9 0 1.7 1.5 2.6 2.7 3.2 1.2.6 1.6 1 1.6 1.5 0 .8-1 1.2-1.9 1.2-1.3 0-2-.2-3.1-.7l-.4-.2-.4 2.6c.7.3 2 .6 3.4.6 3.2 0 5.3-1.6 5.3-4 0-1.3-.8-2.3-2.6-3.2-1.1-.6-1.7-.9-1.7-1.5 0-.5.6-1.1 1.8-1.1 1 0 1.8.2 2.3.5l.3.1.5-2.5zm7.3 7.8l1.4-3.8.8 3.8h-2.2zm3.3-7.8h-2.3c-.7 0-1.2.2-1.5.9l-4.4 10.8h3l.6-1.7h3.7l.3 1.7h2.7l-2.1-11.7zm-26.6 0l-2.9 8.2-.3-1.6c-.5-1.8-2.1-3.7-3.9-4.7l2.5 9.8h3.1l4.6-11.7h-3.1z"
        fill="#1A1F71"
      />
      <path
        d="M12.3 11.3H7.5l-.1.3c3.8 1 6.3 3.4 7.3 6.2l-1.1-5.7c-.2-.6-.7-.8-1.3-.8z"
        fill="#F7B600"
      />
    </svg>
  );
}

export function MastercardBadge(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 54 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Mastercard"
      className="h-6 w-auto"
      {...props}
    >
      <rect width="54" height="34" rx="5" fill="#FFFFFF" />
      <rect x="0.5" y="0.5" width="53" height="33" rx="4.5" stroke="#E5E7EB" />
      <circle cx="22" cy="17" r="9" fill="#EB001B" />
      <circle cx="32" cy="17" r="9" fill="#F79E1B" />
      <path
        d="M27 10.4a8.95 8.95 0 0 1 3.2 6.6 8.95 8.95 0 0 1-3.2 6.6 8.95 8.95 0 0 1-3.2-6.6c0-2.6 1.2-4.9 3.2-6.6z"
        fill="#FF5F00"
      />
    </svg>
  );
}

export function ApplePayBadge(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 54 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Apple Pay"
      className="h-6 w-auto"
      {...props}
    >
      <rect width="54" height="34" rx="5" fill="#000000" />
      <rect x="0.5" y="0.5" width="53" height="33" rx="4.5" stroke="#333333" />
      {/* Apple Icon */}
      <path
        d="M18.8 16.7c0-1.8 1.4-2.7 1.5-2.8-.8-1.2-2.1-1.4-2.5-1.4-1.1-.1-2.1.6-2.6.6-.6 0-1.4-.6-2.3-.6-1.2 0-2.3.7-2.9 1.8-1.3 2.2-.3 5.4.9 7.2.6.9 1.3 1.8 2.2 1.8.9 0 1.3-.6 2.3-.6 1.1 0 1.4.6 2.3.6 1 0 1.6-.9 2.2-1.7.7-1 1-2 1-2.1-.1 0-1.9-.7-1.9-2.8z"
        fill="#FFFFFF"
      />
      <path
        d="M16.9 11.7c.5-.6.8-1.4.7-2.2-.7 0-1.5.5-2 1-.4.5-.8 1.3-.7 2.1.8.1 1.5-.4 2-.9z"
        fill="#FFFFFF"
      />
      {/* Pay text */}
      <path
        d="M24.2 14.5h2.2c1.4 0 2.4.9 2.4 2.3s-1 2.3-2.4 2.3h-1.1v3.2h-1.1v-7.8zm2.2 3.6c.8 0 1.3-.5 1.3-1.3 0-.8-.5-1.3-1.3-1.3h-1.1v2.6h1.1z"
        fill="#FFFFFF"
      />
      <path
        d="M32.5 17.6c0-.9.7-1.4 1.8-1.4.8 0 1.4.2 1.7.4v-.4c0-.7-.5-1.1-1.3-1.1-.6 0-1.2.2-1.6.4l-.3-.8c.5-.3 1.3-.5 2.1-.5 1.5 0 2.3.8 2.3 2.1v4.8h-1v-1.1c-.4.7-1.1 1.2-2 1.2-1.2 0-2-.8-2-1.9 0-1.2.9-1.8 2-1.8.7 0 1.3.2 1.7.4v-.6c-.2-.4-.7-.7-1.4-.7-.7 0-1.3.2-1.7.4l-.3-.7zm3.5 2.1v-.6c-.3-.2-.8-.4-1.4-.4-.7 0-1.2.3-1.2.9 0 .5.4.9 1 .9.8 0 1.6-.5 1.6-.8z"
        fill="#FFFFFF"
      />
      <path
        d="M39.6 15.5l1.6 4.7 1.5-4.7h1.2l-2.4 6.6c-.5 1.4-1.1 1.9-2.2 1.9-.3 0-.7 0-.9-.1v-.9c.2 0 .4.1.7.1.6 0 .9-.3 1.2-1.1l.2-.5-2.2-6.5h1.3z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function PaymentBadges({ className = "" }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      aria-label={t.footer.paymentMethodsAria}
    >
      <MadaBadge />
      <VisaBadge />
      <MastercardBadge />
      <ApplePayBadge />
    </div>
  );
}
