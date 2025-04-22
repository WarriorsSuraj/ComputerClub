struct node {
    x: u64;
    y: u64;

    h: u64;
    g: u64;
    f: u64;

    parent: Option<Box<node>>;
    obstacle: bool;
}

