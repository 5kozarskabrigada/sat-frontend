import { jsx as _jsx } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
const ExamLayout = () => {
    return (_jsx("div", { className: "exam-root", children: _jsx(Outlet, {}) }));
};
export default ExamLayout;
