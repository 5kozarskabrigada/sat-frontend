import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams } from 'react-router-dom';
const ResultsPage = () => {
    const { resultId } = useParams();
    return (_jsxs("div", { className: "results-page", children: [_jsx("h1", { children: "Exam Results" }), _jsxs("p", { children: ["Your result id: ", resultId] })] }));
};
export default ResultsPage;
