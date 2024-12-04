import { CiPhone, CiLocationOn, CiDeliveryTruck } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { PiCurrencyDollarSimpleThin } from "react-icons/pi";
import { GoPerson } from "react-icons/go";

function Header() {
  const contactItems = [
    { icon: <CiPhone color="#f5a623" size={18} />, text: "01095400370" },
    {
      icon: <MdOutlineEmail color="#f5a623" size={18} />,
      text: "alielsharqawy250@gmail.com",
    },
  ];

  const navigationItems = [
    { icon: <CiLocationOn size={18} />, text: "Store Locator" },
    { icon: <CiDeliveryTruck size={18} />, text: "Track Your Order" },
    { icon: <PiCurrencyDollarSimpleThin size={18} />, text: "Dollar (US)" },
    { icon: <GoPerson size={18} />, text: "Register or Login" },
  ];

  return (
    <div>
      <div className="header mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 mt-2 px-4 max-w-7xl">
        {/* Contact Items */}
        <div className="contact w-full sm:w-auto">
          <ul className="flex flex-wrap justify-center sm:justify-start gap-3 text-sm">
            {contactItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                {item.icon}
                <a className="text-gray-700">{item.text}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation Items */}
        <div className="navigation w-full sm:w-auto">
          <ul className="flex flex-wrap justify-center sm:justify-end gap-3 text-sm">
            {navigationItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                {item.icon}
                <a className="text-gray-700">{item.text}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t-2 border-gray-200 mt-2" />
    </div>
  );
}

export default Header;
