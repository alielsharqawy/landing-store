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
    <div className="header container mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 mt-2 px-4">
      {/* Contact Items */}
      <div className="right">
        <ul className="flex flex-wrap justify-center sm:justify-start gap-3 text-sm">
          {contactItems.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center gap-2 whitespace-nowrap"
            >
              {item.icon}
              <a className="text-gray-700">{item.text}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation Items */}
      <div className="left">
        <ul className="flex flex-wrap justify-center sm:justify-end gap-3 text-sm">
          {navigationItems.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center gap-2 whitespace-nowrap"
            >
              {item.icon}
              <a className="text-gray-700">{item.text}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Header;
