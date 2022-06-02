import { SVGProps } from "react";

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
}

export default function SidebarRow({ Icon, title }: Props) {
  return (
    <div className="flex items-center px-4 py-4 space-x-2 transition-all duration-200 rounded-full cursor-pointer max-w-fit group hover:bg-gray-100">
      <Icon className="w-6 h-6 group-hover:text-twitter" />
      <p className="hidden text-base font-light lg:text-xl group-hover:text-twitter md:inline-flex">
        {title}
      </p>
    </div>
  );
}
