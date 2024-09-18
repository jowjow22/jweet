import { createContext, useContext } from 'react';

interface IConditionalContext {
    condition: boolean;
}

interface IConditionalProps {
    condition: boolean;
    children: React.ReactNode;
}

const conditionalContext = createContext<IConditionalContext>({
    condition: false,
});


const Conditional = ({ condition, children }: IConditionalProps) => {
    return <conditionalContext.Provider value={{ condition }}>{children}</conditionalContext.Provider>;
}

const If = ({ children }: { children: React.ReactNode }) => {
    const { condition } = useContext(conditionalContext);

    return condition ? <>{children}</> : null;
}

const Else = ({ children }: { children: React.ReactNode }) => {
    const { condition } = useContext(conditionalContext);

    return condition ? null : <>{children}</>;
}

Conditional.If = If;
Conditional.Else = Else;

export { Conditional };
