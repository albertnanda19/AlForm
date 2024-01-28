const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex w-full flex-col mx-auto">{children}</div>
    );
}

export default layout;